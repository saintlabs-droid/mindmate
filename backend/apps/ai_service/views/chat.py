"""
Chat API Views

Provides endpoints for AI chatbot functionality with stateful conversations.
Implements conversation management, context preservation, and crisis detection.

Enterprise-grade implementation following FAANG standards:
- Stateful conversation management with context preservation
- Optimized database queries with select_related and prefetch_related
- Transaction safety for data consistency
- Comprehensive input validation and sanitization
- Crisis detection with resource suggestions
- Performance monitoring and logging
- Pagination for chat history
"""

import logging
from typing import Optional
from django.db import transaction
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination

from apps.ai_service.models import ChatMessage, Conversation
from apps.ai_service.serializers.chat import (
    ChatMessageSerializer,
    ChatInputSerializer,
    ConversationSerializer
)
from apps.ai_service.services import ChatService
from apps.ai_service.mixins import AIResponseMixin, ProcessingTimeMixin
from apps.ai_service.throttles import AIRateThrottle, AIBurstThrottle
from apps.ai_service.exceptions import GeminiServiceError

logger = logging.getLogger(__name__)


class ChatView(ProcessingTimeMixin, AIResponseMixin, APIView):
    """
    API endpoint for AI chatbot message submission.
    
    Handles both new conversation creation and continuation of existing
    conversations. Maintains conversation context using Gemini's
    interaction chaining feature.
    
    Endpoint: POST /api/v1/ai/chat/
    
    Features:
        - Automatic conversation creation for new chats
        - Context preservation using previous_interaction_id
        - Crisis detection with resource suggestions
        - Transaction-safe message persistence
        - Comprehensive error handling
    
    Request Body:
        {
            "message": "I'm feeling anxious today",
            "conversation_id": "uuid" (optional)
        }
    
    Response:
        {
            "success": true,
            "data": {
                "user_message": {
                    "id": "uuid",
                    "conversation_id": "uuid",
                    "sender": "user",
                    "content": "I'm feeling anxious today",
                    "timestamp": "2025-02-25T10:30:00Z"
                },
                "ai_message": {
                    "id": "uuid",
                    "conversation_id": "uuid",
                    "sender": "ai",
                    "content": "I hear you...",
                    "detected_mood": "anxious",
                    "suggested_activities": ["Deep breathing", "..."],
                    "follow_up_questions": ["What triggered this?"],
                    "crisis_flag": false,
                    "resource_suggestions": [],
                    "timestamp": "2025-02-25T10:30:01Z"
                },
                "conversation": {
                    "id": "uuid",
                    "title": "",
                    "is_active": true,
                    "message_count": 2,
                    "created_at": "2025-02-25T10:30:00Z",
                    "updated_at": "2025-02-25T10:30:01Z"
                }
            },
            "meta": {
                "timestamp": "2025-02-25T10:30:01Z",
                "processing_time_ms": 1500,
                "conversation_id": "uuid",
                "crisis_detected": false
            }
        }
    
    Error Responses:
        - 400: Invalid input (empty message, invalid conversation_id)
        - 401: Authentication required
        - 404: Conversation not found
        - 429: Rate limit exceeded
        - 503: AI service unavailable
        - 500: Server error
    """
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [AIRateThrottle, AIBurstThrottle]
    
    def _get_or_create_conversation(
        self,
        user_id: int,
        conversation_id: Optional[str] = None
    ) -> Conversation:
        """
        Get existing conversation or create a new one.
        
        Validates that the conversation belongs to the authenticated user
        if conversation_id is provided. Creates a new conversation if
        conversation_id is None.
        
        Args:
            user_id: User's database ID
            conversation_id: Optional UUID string of existing conversation
            
        Returns:
            Conversation object (existing or newly created)
            
        Raises:
            Conversation.DoesNotExist: If conversation_id doesn't exist
            PermissionError: If conversation doesn't belong to user
        """
        if conversation_id:
            # Retrieve existing conversation
            try:
                conversation = Conversation.objects.get(
                    id=conversation_id,
                    user_id=user_id
                )
                logger.info(
                    f"Retrieved existing conversation {conversation_id} "
                    f"for user {user_id}"
                )
                return conversation
            except Conversation.DoesNotExist:
                logger.warning(
                    f"Conversation {conversation_id} not found for user {user_id}"
                )
                raise
        
        # Create new conversation
        conversation = Conversation.objects.create(
            user_id=user_id,
            is_active=True
        )
        logger.info(
            f"Created new conversation {conversation.id} for user {user_id}"
        )
        return conversation
    
    def _get_previous_interaction_id(
        self,
        conversation: Conversation
    ) -> Optional[str]:
        """
        Retrieve the interaction_id from the last AI message in conversation.
        
        This enables context preservation by chaining Gemini interactions.
        Only AI messages have interaction_ids since they represent Gemini
        API responses.
        
        Args:
            conversation: The Conversation object
            
        Returns:
            interaction_id string from last AI message, or None if no previous messages
        """
        last_ai_message = conversation.messages.filter(
            sender='ai'
        ).order_by('-timestamp').first()
        
        if last_ai_message and last_ai_message.interaction_id:
            logger.info(
                f"Found previous interaction_id: {last_ai_message.interaction_id}"
            )
            return last_ai_message.interaction_id
        
        logger.info("No previous interaction_id found (new conversation)")
        return None
    
    @transaction.atomic
    def _persist_messages(
        self,
        user_id: int,
        conversation: Conversation,
        user_message_content: str,
        ai_response,
        interaction_id: str
    ) -> tuple[ChatMessage, ChatMessage]:
        """
        Persist both user and AI messages to database atomically.
        
        Uses atomic transaction to ensure both messages are saved together
        or neither is saved if an error occurs. This maintains data
        consistency.
        
        Args:
            user_id: User's database ID
            conversation: Conversation object
            user_message_content: User's message text
            ai_response: ChatResponseResult from AI service
            interaction_id: Gemini interaction ID for tracking
            
        Returns:
            Tuple of (user_message, ai_message) ChatMessage objects
        """
        # Save user message
        user_message = ChatMessage.objects.create(
            user_id=user_id,
            conversation=conversation,
            sender='user',
            content=user_message_content
        )
        
        # Save AI response message
        ai_message = ChatMessage.objects.create(
            user_id=user_id,
            conversation=conversation,
            sender='ai',
            content=ai_response.response_text,
            detected_mood=ai_response.detected_mood,
            suggested_activities=ai_response.suggested_activities,
            follow_up_questions=ai_response.follow_up_questions,
            crisis_flag=ai_response.crisis_flag,
            resource_suggestions=ai_response.resource_suggestions,
            interaction_id=interaction_id
        )
        
        # Update conversation timestamp
        conversation.updated_at = timezone.now()
        conversation.save(update_fields=['updated_at'])
        
        logger.info(
            f"Persisted user message {user_message.id} and "
            f"AI message {ai_message.id} to conversation {conversation.id}"
        )
        
        return user_message, ai_message
    
    def post(self, request):
        """
        Handle chat message POST request.
        
        Workflow:
        1. Validate input (message, optional conversation_id)
        2. Get or create conversation
        3. Retrieve previous interaction_id for context
        4. Call ChatService to get AI response
        5. Persist both messages atomically
        6. Return both messages with conversation metadata
        
        Args:
            request: DRF Request object
        
        Returns:
            Response: Standardized success or error response
        """
        self.start_timer()
        user_id = request.user.id
        
        # Validate input
        input_serializer = ChatInputSerializer(data=request.data)
        if not input_serializer.is_valid():
            logger.warning(
                f"Invalid chat input for user {user_id}: "
                f"{input_serializer.errors}"
            )
            return self.error_response(
                code="VALIDATION_ERROR",
                message="Invalid input data",
                status=400,
                details=input_serializer.errors
            )
        
        validated_data = input_serializer.validated_data
        user_message_content = validated_data['message']
        conversation_id = validated_data.get('conversation_id')
        
        try:
            # Get or create conversation
            conversation = self._get_or_create_conversation(
                user_id, conversation_id
            )
            
            # Get previous interaction ID for context
            previous_interaction_id = self._get_previous_interaction_id(
                conversation
            )
            
            # Generate AI response
            logger.info(
                f"Generating AI response for user {user_id}, "
                f"conversation {conversation.id}"
            )
            
            service = ChatService()
            ai_response, interaction_id = service.send_message(
                user_id=request.user.id,
                message=user_message_content,
                previous_interaction_id=previous_interaction_id
            )
            
            # Persist messages
            user_message, ai_message = self._persist_messages(
                user_id=user_id,
                conversation=conversation,
                user_message_content=user_message_content,
                ai_response=ai_response,
                interaction_id=interaction_id
            )
            
            # Serialize response data
            user_message_data = ChatMessageSerializer(user_message).data
            ai_message_data = ChatMessageSerializer(ai_message).data
            conversation_data = ConversationSerializer(conversation).data
            
            processing_time = self.get_processing_time()
            
            logger.info(
                f"Successfully processed chat message for user {user_id}, "
                f"conversation {conversation.id}, "
                f"crisis_flag={ai_response.crisis_flag}"
            )
            
            return self.success_response(
                data={
                    "user_message": user_message_data,
                    "ai_message": ai_message_data,
                    "conversation": conversation_data
                },
                meta={
                    "processing_time_ms": processing_time,
                    "conversation_id": str(conversation.id),
                    "crisis_detected": ai_response.crisis_flag
                },
                status=201
            )
            
        except Conversation.DoesNotExist:
            logger.error(
                f"Conversation {conversation_id} not found for user {user_id}"
            )
            return self.error_response(
                code="NOT_FOUND",
                message="Conversation not found",
                status=404
            )
        
        except GeminiServiceError as e:
            logger.error(
                f"Gemini service error for user {user_id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="AI_SERVICE_UNAVAILABLE",
                message="AI chat service is temporarily unavailable. Please try again later.",
                status=503
            )
        
        except Exception as e:
            logger.error(
                f"Unexpected error processing chat for user {user_id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="SERVER_ERROR",
                message="An unexpected error occurred while processing your message.",
                status=500
            )


class ChatHistoryPagination(PageNumberPagination):
    """
    Custom pagination for chat history.
    
    Returns messages in pages of 50 with metadata about total count
    and page numbers.
    """
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100


class ChatHistoryView(AIResponseMixin, APIView):
    """
    API endpoint for retrieving chat conversation history.
    
    Returns paginated list of messages for a specific conversation,
    ordered chronologically (oldest first) for natural chat display.
    
    Endpoint: GET /api/v1/ai/chat/history/
    
    Features:
        - Pagination support (50 messages per page)
        - Optimized query with select_related
        - Chronological ordering
        - Conversation ownership validation
    
    Query Parameters:
        - conversation_id (required): UUID of the conversation
        - page (optional): Page number (default: 1)
        - page_size (optional): Messages per page (default: 50, max: 100)
    
    Response:
        {
            "success": true,
            "data": {
                "messages": [
                    {
                        "id": "uuid",
                        "conversation_id": "uuid",
                        "sender": "user",
                        "content": "Hello",
                        "timestamp": "2025-02-25T10:30:00Z"
                    },
                    {
                        "id": "uuid",
                        "conversation_id": "uuid",
                        "sender": "ai",
                        "content": "Hi there!",
                        "detected_mood": "neutral",
                        "suggested_activities": [],
                        "follow_up_questions": ["How are you?"],
                        "crisis_flag": false,
                        "resource_suggestions": [],
                        "timestamp": "2025-02-25T10:30:01Z"
                    }
                ],
                "conversation": {
                    "id": "uuid",
                    "title": "",
                    "is_active": true,
                    "message_count": 10,
                    "created_at": "2025-02-25T10:00:00Z",
                    "updated_at": "2025-02-25T10:30:01Z"
                }
            },
            "meta": {
                "timestamp": "2025-02-25T10:30:02Z",
                "page": 1,
                "page_size": 50,
                "total_messages": 10,
                "total_pages": 1
            }
        }
    
    Error Responses:
        - 400: Missing or invalid conversation_id
        - 401: Authentication required
        - 404: Conversation not found
        - 500: Server error
    """
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = ChatHistoryPagination
    
    def get(self, request):
        """
        Handle chat history GET request.
        
        Retrieves all messages for a conversation with pagination.
        Validates conversation ownership before returning data.
        
        Args:
            request: DRF Request object
        
        Returns:
            Response: Standardized success or error response
        """
        user_id = request.user.id
        conversation_id = request.query_params.get('conversation_id')
        
        # Validate conversation_id parameter
        if not conversation_id:
            logger.warning(f"Missing conversation_id for user {user_id}")
            return self.error_response(
                code="VALIDATION_ERROR",
                message="conversation_id query parameter is required",
                status=400
            )
        
        try:
            # Validate conversation exists and belongs to user
            conversation = Conversation.objects.get(
                id=conversation_id,
                user_id=user_id
            )
            
            # Query messages with optimization
            messages = ChatMessage.objects.filter(
                conversation=conversation
            ).select_related('conversation').order_by('timestamp')
            
            # Apply pagination
            paginator = self.pagination_class()
            paginated_messages = paginator.paginate_queryset(
                messages, request
            )
            
            # Serialize data
            messages_data = ChatMessageSerializer(
                paginated_messages, many=True
            ).data
            conversation_data = ConversationSerializer(conversation).data
            
            logger.info(
                f"Retrieved {len(paginated_messages)} messages for "
                f"conversation {conversation_id}, user {user_id}"
            )
            
            return self.success_response(
                data={
                    "messages": messages_data,
                    "conversation": conversation_data
                },
                meta={
                    "page": paginator.page.number,
                    "page_size": paginator.page_size,
                    "total_messages": paginator.page.paginator.count,
                    "total_pages": paginator.page.paginator.num_pages
                }
            )
            
        except Conversation.DoesNotExist:
            logger.error(
                f"Conversation {conversation_id} not found for user {user_id}"
            )
            return self.error_response(
                code="NOT_FOUND",
                message="Conversation not found",
                status=404
            )
        
        except Exception as e:
            logger.error(
                f"Unexpected error retrieving chat history for user {user_id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="SERVER_ERROR",
                message="An unexpected error occurred while retrieving chat history.",
                status=500
            )


__all__ = ['ChatView', 'ChatHistoryView']
