"""
Chat Serializers

Serializers for AI chatbot endpoints including:
- ChatMessageSerializer: Output serializer for chat messages
- ChatInputSerializer: Input validation for chat message submission
- ConversationSerializer: Output serializer for conversation metadata
"""

from rest_framework import serializers
from apps.ai_service.models import ChatMessage, Conversation
from .base import TimestampedSerializer


class ConversationSerializer(TimestampedSerializer):
    """
    Serializer for Conversation model output.
    
    Returns conversation metadata including title, active status,
    and timestamps.
    """
    
    id = serializers.UUIDField(read_only=True)
    message_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = [
            'id',
            'title',
            'is_active',
            'message_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_message_count(self, obj):
        """Return the number of messages in this conversation."""
        return obj.messages.count()


class ChatMessageSerializer(TimestampedSerializer):
    """
    Serializer for ChatMessage model output.
    
    Returns all chat message fields including sender, content,
    AI response metadata (detected mood, suggested activities,
    crisis flag, etc.), and timestamps.
    """
    
    id = serializers.UUIDField(read_only=True)
    conversation_id = serializers.UUIDField(source='conversation.id', read_only=True, allow_null=True)
    
    class Meta:
        model = ChatMessage
        fields = [
            'id',
            'conversation_id',
            'sender',
            'content',
            'detected_mood',
            'suggested_activities',
            'follow_up_questions',
            'crisis_flag',
            'resource_suggestions',
            'timestamp',
        ]
        read_only_fields = fields


class ChatInputSerializer(serializers.Serializer):
    """
    Input serializer for chat message requests.
    
    Validates user message input and optional conversation ID
    for continuing existing conversations.
    """
    
    message = serializers.CharField(
        required=True,
        max_length=5000,
        trim_whitespace=True,
        help_text="User message content"
    )
    conversation_id = serializers.UUIDField(
        required=False,
        allow_null=True,
        help_text="Optional conversation ID to continue existing conversation"
    )
    
    def validate_message(self, value):
        """
        Validate message content is not empty after trimming.
        
        Args:
            value: The message string
            
        Returns:
            The validated message
            
        Raises:
            serializers.ValidationError: If message is empty
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Message cannot be empty")
        return value.strip()

