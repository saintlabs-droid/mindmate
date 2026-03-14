"""
Test Chat Bridge Management Command

This command creates test data and verifies the chat bridge functionality
works end-to-end without requiring the full AI service.
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.models import Conversation, ChatMessage
from apps.chat_bridge.models import MoodConversationLink
from apps.chat_bridge.services import ChatBridgeService

User = get_user_model()


class Command(BaseCommand):
    help = 'Test the chat bridge functionality with sample data'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--cleanup',
            action='store_true',
            help='Clean up test data after running tests',
        )
    
    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS('Testing Chat Bridge Functionality...')
        )
        
        # Create or get test user
        user, created = User.objects.get_or_create(
            email='chatbridge_test@example.com',
            defaults={'password': 'testpass123'}
        )
        
        if created:
            self.stdout.write(f'Created test user: {user.email}')
        else:
            self.stdout.write(f'Using existing test user: {user.email}')
        
        # Test 1: Create mood entry without note (should trigger chat bridge)
        self.stdout.write('\n--- Test 1: Note-less mood entry ---')
        
        mood_entry = MoodEntry.objects.create(
            user=user,
            mood_level=2,
            stress_category='Academics',
            note=''  # No note - should trigger
        )
        
        self.stdout.write(f'Created mood entry: {mood_entry.id}')
        
        # Check if conversation was created
        try:
            link = MoodConversationLink.objects.get(mood_entry=mood_entry)
            self.stdout.write(
                self.style.SUCCESS(
                    f'✓ Conversation link created: {link.generation_status}'
                )
            )
            
            if link.starter_message:
                self.stdout.write(
                    f'✓ Starter message: {link.starter_message.content[:100]}...'
                )
            
        except MoodConversationLink.DoesNotExist:
            self.stdout.write(
                self.style.ERROR('✗ No conversation link created')
            )
        
        # Test 2: Create mood entry with note (should NOT trigger chat bridge)
        self.stdout.write('\n--- Test 2: Mood entry with note ---')
        
        mood_with_note = MoodEntry.objects.create(
            user=user,
            mood_level=4,
            stress_category='Career',
            note='Had a great day at work!'
        )
        
        self.stdout.write(f'Created mood entry with note: {mood_with_note.id}')
        
        # Check that no conversation was created
        link_exists = MoodConversationLink.objects.filter(
            mood_entry=mood_with_note
        ).exists()
        
        if not link_exists:
            self.stdout.write(
                self.style.SUCCESS('✓ No conversation created for noted entry')
            )
        else:
            self.stdout.write(
                self.style.ERROR('✗ Conversation created for noted entry')
            )
        
        # Test 3: Test fallback mechanism
        self.stdout.write('\n--- Test 3: Fallback mechanism ---')
        
        service = ChatBridgeService()
        fallback_result = service.context_generator.get_fallback_starter(mood_entry)
        
        self.stdout.write(f'✓ Fallback starter generated')
        self.stdout.write(f'  Tone: {fallback_result.conversation_tone}')
        self.stdout.write(f'  Length: {len(fallback_result.starter_text)} chars')
        
        # Display summary
        self.stdout.write('\n--- Summary ---')
        total_conversations = Conversation.objects.filter(user=user).count()
        total_links = MoodConversationLink.objects.filter(
            mood_entry__user=user
        ).count()
        total_messages = ChatMessage.objects.filter(user=user).count()
        
        self.stdout.write(f'Total conversations: {total_conversations}')
        self.stdout.write(f'Total mood links: {total_links}')
        self.stdout.write(f'Total messages: {total_messages}')
        
        # Cleanup if requested
        if options['cleanup']:
            self.stdout.write('\n--- Cleanup ---')
            
            # Delete test data
            MoodEntry.objects.filter(user=user).delete()
            Conversation.objects.filter(user=user).delete()
            ChatMessage.objects.filter(user=user).delete()
            
            if created:  # Only delete if we created the user
                user.delete()
                self.stdout.write('✓ Test data cleaned up')
        
        self.stdout.write(
            self.style.SUCCESS('\nChat Bridge test completed!')
        )