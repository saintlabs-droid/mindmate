"""
Quick test script for mood-to-chat bridge.
Run this to quickly verify the feature is working.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.models import Conversation
from apps.chat_bridge.models import MoodConversationLink

User = get_user_model()

print("\n" + "="*60)
print("  QUICK TEST: Mood-to-Chat Bridge")
print("="*60 + "\n")

# Get or create test user
user, created = User.objects.get_or_create(
    email='quicktest@example.com',
    defaults={'full_name': 'Quick Test User'}
)

if created:
    user.set_password('testpass123')
    user.save()
    print(f"✓ Created test user: {user.email}")
else:
    print(f"✓ Using existing user: {user.email}")

# Create a note-less mood entry
print("\nCreating mood entry without note...")
mood_entry = MoodEntry.objects.create(
    user=user,
    mood_level=2,  # Distressed
    stress_category='Academics',
    note=''  # No note - should trigger chat bridge
)

print(f"✓ Mood entry created (ID: {mood_entry.id})")
print(f"  - Mood Level: {mood_entry.mood_level}/5")
print(f"  - Stress: {mood_entry.stress_category}")

# Check if conversation was generated
try:
    link = MoodConversationLink.objects.get(mood_entry=mood_entry)
    conversation = link.conversation
    message = link.starter_message
    
    print(f"\n✓ SUCCESS! Conversation generated automatically!")
    print(f"  - Conversation: {conversation.title}")
    print(f"  - Status: {link.generation_status}")
    print(f"  - Message preview: {message.content[:80]}...")
    
    print("\n" + "="*60)
    print("  The mood-to-chat bridge is working correctly!")
    print("="*60 + "\n")
    
except MoodConversationLink.DoesNotExist:
    print(f"\n✗ FAILED: No conversation was generated")
    print("  Check the troubleshooting section in TESTING_GUIDE.md")
    print("\n" + "="*60 + "\n")
