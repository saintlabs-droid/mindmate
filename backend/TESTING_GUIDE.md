# Mood-to-Chat Bridge - Testing Guide

## Prerequisites

Before testing, ensure you have:
1. Django development server ready to run
2. Database migrations applied
3. At least one test user created
4. Gemini API key configured in environment variables

## Step 1: Apply Database Migrations

First, we need to create the database tables for the chat_bridge app:

```bash
cd backend
python manage.py makemigrations chat_bridge
python manage.py migrate
```

This creates the `MoodConversationLink` model table and indexes.

## Step 2: Run Automated Tests

Run the comprehensive test script:

```bash
python test_mood_to_chat.py
```

This script tests:
- MoodContextGenerator (mood interpretation and stress analysis)
- ChatBridgeService (eligibility checking and workflow)
- End-to-end workflow (mood entry → conversation generation)
- Signal integration (automatic triggering)

## Step 3: Run Django Unit Tests

Run the full test suite:

```bash
python manage.py test apps.chat_bridge
```

This runs all property-based tests and unit tests covering:
- Mood entry processing eligibility
- Mood level classification
- Stress factor integration
- Conversation starter format
- Daily conversation management
- Error resilience
- Security and privacy compliance

## Step 4: Start Development Server

```bash
python manage.py runserver
```

The server will start at `http://localhost:8000`

## Step 5: Test via Django Admin

1. Navigate to `http://localhost:8000/admin/`
2. Log in with your superuser credentials
3. Go to "Mood Tracking" → "Mood Entries"
4. Create a new mood entry:
   - Select a user
   - Choose mood level (1-5)
   - Select stress category
   - **Leave note field empty** (this triggers chat bridge)
   - Save

5. Check results:
   - Go to "AI Service" → "Conversations"
   - You should see a new "Daily Check-in" conversation
   - Click on it to see the generated conversation starter
   - Go to "Chat Bridge" → "Mood Conversation Links"
   - Verify the link was created with status "generated"

## Step 6: Test Health Check Endpoint

Check the monitoring endpoint:

```bash
curl http://localhost:8000/api/chat-bridge/health/
```

Expected response:
```json
{
    "status": "healthy",
    "timestamp": "2024-01-01T12:00:00Z",
    "metrics": {
        "success_rate_percent": 100.0,
        "error_rate_percent": 0.0,
        "average_generation_time_seconds": 2.5,
        "conversations_generated_last_hour": 1
    },
    "thresholds": {
        "success_rate_threshold": 95.0,
        "error_rate_threshold": 5.0,
        "generation_time_threshold": 5.0
    }
}
```

## Step 7: Test with Management Command

Use the built-in test command:

```bash
python manage.py test_chat_bridge
```

This creates test mood entries and verifies conversation generation.

To clean up test data:
```bash
python manage.py test_chat_bridge --cleanup
```

## Step 8: Test Different Mood Levels

Create mood entries with different mood levels to see different conversation tones:

### Distressed State (Mood 1-2)
- Should generate empathetic, supportive conversation starters
- Example: "I can see you're having a tough time..."

### Neutral State (Mood 3)
- Should generate exploratory, gentle conversation starters
- Example: "It seems like you're in a reflective space..."

### Positive State (Mood 4-5)
- Should generate growth-focused conversation starters
- Example: "I'm glad to hear you're feeling positive..."

## Step 9: Test Different Stress Factors

Try different stress categories:
- Academics
- Finances
- Relationships
- Family
- Career

Each should be referenced in the generated conversation starter.

## Step 10: Test Edge Cases

### Test 1: Mood Entry with Note
Create a mood entry WITH a note - should NOT trigger conversation generation.

### Test 2: Multiple Entries Same Day
Create multiple note-less entries on the same day - should reuse the same daily conversation.

### Test 3: Invalid Mood Level
Try creating an entry with invalid mood level (0 or 6) - should be rejected by validation.

### Test 4: Missing Stress Category
Try creating an entry without stress category - should not trigger conversation generation.

## Troubleshooting

### Issue: No conversation generated

**Check:**
1. Mood entry has no note (or only whitespace)
2. Mood level is between 1-5
3. Stress category is selected
4. Check Django logs for errors
5. Verify Gemini API key is configured

**Solution:**
```bash
# Check logs
python manage.py runserver --verbosity 2

# Verify signal is connected
python manage.py shell
>>> from django.db.models.signals import post_save
>>> from apps.mood_tracking.models import MoodEntry
>>> post_save._live_receivers(sender=MoodEntry)
```

### Issue: AI generation fails

**Check:**
1. Gemini API key is valid
2. Internet connection is working
3. API rate limits not exceeded

**Solution:**
The system should automatically fall back to template-based starters. Check the MoodConversationLink status field - it should still be "generated" even with fallback.

### Issue: Signal not triggering

**Check:**
1. `chat_bridge` app is in INSTALLED_APPS
2. Signals are imported in apps.py
3. Django server was restarted after adding the app

**Solution:**
```python
# In backend/apps/chat_bridge/apps.py
class ChatBridgeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.chat_bridge'
    verbose_name = 'Chat Bridge'
    
    def ready(self):
        import apps.chat_bridge.signals  # Import signals
```

## Expected Behavior Summary

✓ Note-less mood entries automatically generate conversations
✓ Mood level determines conversation tone (empathetic/exploratory/growth-focused)
✓ Stress factors are referenced in conversation starters
✓ Multiple entries same day reuse daily conversation
✓ Entries with notes do NOT trigger conversation generation
✓ Fallback templates work when AI generation fails
✓ Health check endpoint reports system status
✓ All tests pass successfully

## Performance Expectations

- Conversation generation: < 3 seconds
- Success rate: > 99%
- Fallback usage: < 1%
- No impact on mood entry creation speed

## Next Steps

After successful localhost testing:
1. Test with your frontend application
2. Monitor the health check endpoint regularly
3. Review generated conversations for quality
4. Consider enabling async processing with Celery for production
5. Set up monitoring and alerting for production deployment
