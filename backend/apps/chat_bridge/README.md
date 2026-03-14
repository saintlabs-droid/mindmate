# Chat Bridge - Mood-to-Chat Integration

## Overview

The Chat Bridge feature creates an intelligent integration between the mood tracking system and AI conversation service. When users submit mood entries without personal notes, the system automatically generates contextually appropriate conversation starters to initiate therapeutic AI interactions.

## Architecture

### Core Components

1. **MoodContextGenerator**: Interprets mood data and generates conversation context
2. **ChatBridgeService**: Orchestrates the mood-to-chat integration workflow  
3. **MoodConversationLink**: Tracks relationships between mood entries and conversations
4. **Signal Handlers**: Detect mood entry creation and trigger processing

### Data Flow

```
Mood Entry (no note) → Signal Handler → ChatBridgeService → MoodContextGenerator → AI Service → Conversation Created
```

## Features

### Mood Level Interpretation
- **Levels 1-2**: Distressed states → Empathetic, supportive responses
- **Level 3**: Neutral state → Exploratory, gentle responses  
- **Levels 4-5**: Positive states → Growth-focused responses

### Stress Factor Integration
- Incorporates all selected stress factors into conversation context
- References specific stressors in generated conversation starters
- Prioritizes most impactful stress combinations

### Fallback Mechanisms
- Template-based fallbacks when AI generation fails
- Mood-level-specific fallback messages
- Graceful degradation without breaking mood tracking

## Security & Privacy

- Only accesses mood data for authenticated users
- No persistent storage of mood data beyond conversation generation
- Uses existing Django authentication patterns
- Logs events without storing sensitive mood details

## Monitoring

### Health Check Endpoint
```
GET /api/chat-bridge/health/
```

### Key Metrics
- Conversation generation success rate (target: 99%)
- Average generation time (target: <3 seconds)
- Error rate by type
- Fallback usage rate

## Testing

### Run Tests
```bash
python manage.py test apps.chat_bridge
```

### Test Chat Bridge Functionality
```bash
python manage.py test_chat_bridge
python manage.py test_chat_bridge --cleanup
```

## Configuration

The chat bridge is automatically configured when the app is installed. No additional configuration is required.

### Django Settings
```python
INSTALLED_APPS = [
    # ...
    'apps.chat_bridge',
    # ...
]
```

## Usage

The chat bridge works automatically:

1. User submits mood entry without note
2. System detects eligible entry via Django signals
3. Generates contextual conversation starter
4. Creates or appends to daily conversation
5. Links mood entry to conversation for tracking

## API Integration

### Health Check
```python
GET /api/chat-bridge/health/

Response:
{
    "status": "healthy",
    "timestamp": "2024-01-01T12:00:00Z",
    "metrics": {
        "success_rate_percent": 99.5,
        "error_rate_percent": 0.5,
        "average_generation_time_seconds": 2.1,
        "conversations_generated_last_hour": 15
    }
}
```

## Development

### Adding New Stress Categories
1. Update `MoodEntry.STRESS_CATEGORIES` in mood_tracking app
2. Add corresponding templates in `MoodContextGenerator.FALLBACK_STARTERS`
3. Update stress factor analysis in `STRESS_FACTOR_PRIORITIES`

### Extending Conversation Generation
1. Modify prompts in `MoodContextGenerator.create_contextual_prompt()`
2. Update `ConversationStarterResult` schema if needed
3. Add corresponding tests

## Troubleshooting

### Common Issues

**Conversations not being generated:**
- Check that mood entries have no notes
- Verify mood level is 1-5 and stress category is valid
- Check logs for signal handler errors

**AI generation failures:**
- System should fall back to template-based starters
- Check Gemini API connectivity and rate limits
- Monitor error rates via health check endpoint

**Performance issues:**
- Monitor average generation time
- Check database query performance
- Verify async processing is working

## Future Enhancements

- Async task processing with Celery
- Advanced conversation context from multiple mood entries
- Personalized conversation templates based on user history
- Integration with crisis detection and resource suggestions