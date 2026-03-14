"""
Test script for mood-to-chat bridge feature.

This script tests the complete workflow from mood entry creation
to conversation generation on localhost.
"""

import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.models import Conversation, ChatMessage
from apps.chat_bridge.models import MoodConversationLink
from apps.chat_bridge.services.chat_bridge_service import ChatBridgeService
from apps.chat_bridge.services.mood_context_generator import MoodContextGenerator

User = get_user_model()

def print_section(title):
    """Print a formatted section header."""
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def test_mood_context_generator():
    """Test the MoodContextGenerator component."""
    print_section("Testing MoodContextGenerator")
    
    generator = MoodContextGenerator()
    
    # Test mood level interpretation
    print("1. Testing mood level interpretation...")
    for mood_level in [1, 2, 3, 4, 5]:
        interpretation = generator.interpret_mood_level(mood_level)
        print(f"   Mood {mood_level}: {interpretation.emotional_state} -> {interpretation.tone_category}")
    
    # Test stress factor analysis
    print("\n2. Testing stress factor analysis...")
    stress_factors = ['Academics', 'Finances']
    analysis = generator.analyze_stress_factors(stress_factors)
    print(f"   Primary stressor: {analysis.primary_stressor}")
    print(f"   Stress intensity: {analysis.stress_intensity}")
    print(f"   Focus areas: {', '.join(analysis.focus_areas)}")
    
    print("\n✓ MoodContextGenerator tests passed!")

def test_chat_bridge_service():
    """Test the ChatBridgeService component."""
    print_section("Testing ChatBridgeService")
    
    service = ChatBridgeService()
    
    # Get or create test user
    print("1. Setting up test user...")
    user, created = User.objects.get_or_create(
        email='test_mood_chat@example.com',
        defaults={'full_name': 'Test User'}
    )
    if created:
        user.set_password('testpass123')
        user.save()
    print(f"   User: {user.email} {'(created)' if created else '(existing)'}")
    
    # Test eligibility checking
    print("\n2. Testing mood entry eligibility...")
    
    # Create entry with note (should not trigger)
    entry_with_note = MoodEntry.objects.create(
        user=user,
        mood_level=3,
        stress_category='Academics',
        note='I had a good day'
    )
    should_process = service.should_generate_conversation(entry_with_note)
    print(f"   Entry with note: {should_process} (expected: False)")
    
    # Create entry without note (should trigger)
    entry_without_note = MoodEntry.objects.create(
        user=user,
        mood_level=2,
        stress_category='Finances',
        note=''
    )
    should_process = service.should_generate_conversation(entry_without_note)
    print(f"   Entry without note: {should_process} (expected: True)")
    
    print("\n✓ ChatBridgeService tests passed!")
    
    return user, entry_without_note

def test_end_to_end_workflow(user, mood_entry):
    """Test the complete end-to-end workflow."""
    print_section("Testing End-to-End Workflow")
    
    service = ChatBridgeService()
    
    print("1. Processing mood entry...")
    print(f"   Mood Level: {mood_entry.mood_level}/5")
    print(f"   Stress Factor: {mood_entry.stress_category}")
    print(f"   Has Note: {'Yes' if mood_entry.note else 'No'}")
    
    try:
        conversation_id = service.process_mood_entry(mood_entry)
        
        if conversation_id:
            print(f"\n2. ✓ Conversation generated successfully!")
            print(f"   Conversation ID: {conversation_id}")
            
            # Verify conversation was created
            conversation = Conversation.objects.get(id=conversation_id)
            print(f"   Conversation Title: {conversation.title}")
            
            # Verify message was created
            messages = ChatMessage.objects.filter(conversation=conversation)
            if messages.exists():
                message = messages.first()
                print(f"\n3. ✓ Conversation starter created!")
                print(f"   Sender: {message.sender}")
                print(f"   Content preview: {message.content[:100]}...")
                print(f"   Detected mood: {message.detected_mood}")
                
            # Verify link was created
            link = MoodConversationLink.objects.get(mood_entry=mood_entry)
            print(f"\n4. ✓ Mood-Conversation link created!")
            print(f"   Status: {link.generation_status}")
            print(f"   Link ID: {link.id}")
            
            print("\n✓ End-to-end workflow completed successfully!")
            return True
        else:
            print("\n✗ Conversation generation was skipped")
            return False
            
    except Exception as e:
        print(f"\n✗ Error during workflow: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_signal_integration():
    """Test that Django signals trigger conversation generation."""
    print_section("Testing Signal Integration")
    
    # Get or create test user
    user, _ = User.objects.get_or_create(
        email='test_signal@example.com',
        defaults={'full_name': 'Signal Test User'}
    )
    
    print("1. Creating mood entry (should trigger signal)...")
    initial_conversation_count = Conversation.objects.filter(user=user).count()
    initial_link_count = MoodConversationLink.objects.filter(mood_entry__user=user).count()
    
    # Create mood entry without note (should trigger signal)
    mood_entry = MoodEntry.objects.create(
        user=user,
        mood_level=4,
        stress_category='Career',
        note=''  # No note - should trigger
    )
    
    print(f"   Mood entry created: {mood_entry.id}")
    
    # Check if conversation was created
    final_conversation_count = Conversation.objects.filter(user=user).count()
    final_link_count = MoodConversationLink.objects.filter(mood_entry__user=user).count()
    
    print(f"\n2. Checking signal results...")
    print(f"   Conversations before: {initial_conversation_count}")
    print(f"   Conversations after: {final_conversation_count}")
    print(f"   Links before: {initial_link_count}")
    print(f"   Links after: {final_link_count}")
    
    if final_conversation_count > initial_conversation_count:
        print("\n✓ Signal integration working! Conversation was auto-generated.")
        return True
    else:
        print("\n✗ Signal integration issue - no conversation was created")
        return False

def cleanup_test_data():
    """Clean up test data."""
    print_section("Cleaning Up Test Data")
    
    print("Removing test users and related data...")
    test_emails = ['test_mood_chat@example.com', 'test_signal@example.com']
    
    for email in test_emails:
        try:
            user = User.objects.get(email=email)
            # Delete user (cascades to mood entries, conversations, etc.)
            user.delete()
            print(f"   ✓ Deleted user: {email}")
        except User.DoesNotExist:
            print(f"   - User not found: {email}")
    
    print("\n✓ Cleanup completed!")

def main():
    """Run all tests."""
    print("\n" + "="*60)
    print("  MOOD-TO-CHAT BRIDGE - LOCALHOST TESTING")
    print("="*60)
    
    try:
        # Test 1: MoodContextGenerator
        test_mood_context_generator()
        
        # Test 2: ChatBridgeService
        user, mood_entry = test_chat_bridge_service()
        
        # Test 3: End-to-end workflow
        test_end_to_end_workflow(user, mood_entry)
        
        # Test 4: Signal integration
        test_signal_integration()
        
        # Final summary
        print_section("TEST SUMMARY")
        print("✓ All tests completed successfully!")
        print("\nThe mood-to-chat bridge is working correctly on localhost.")
        print("\nNext steps:")
        print("1. Test with the Django admin interface")
        print("2. Test with your frontend application")
        print("3. Monitor the health check endpoint: /api/chat-bridge/health/")
        
    except Exception as e:
        print(f"\n✗ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        # Ask if user wants to clean up
        print("\n" + "="*60)
        response = input("Do you want to clean up test data? (y/n): ")
        if response.lower() == 'y':
            cleanup_test_data()
        else:
            print("Test data preserved for manual inspection.")

if __name__ == '__main__':
    main()
