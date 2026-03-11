# Generated migration for chat_bridge app

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mood_tracking', '0001_initial'),
        ('ai_service', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MoodConversationLink',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('generation_status', models.CharField(choices=[('pending', 'Pending'), ('generated', 'Generated'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mood_links', to='ai_service.conversation')),
                ('mood_entry', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='conversation_link', to='mood_tracking.moodentry')),
                ('starter_message', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='mood_starter_links', to='ai_service.chatmessage')),
            ],
            options={
                'verbose_name': 'Mood Conversation Link',
                'verbose_name_plural': 'Mood Conversation Links',
            },
        ),
        migrations.AddIndex(
            model_name='moodconversationlink',
            index=models.Index(fields=['mood_entry'], name='chat_bridge_mood_entry_idx'),
        ),
        migrations.AddIndex(
            model_name='moodconversationlink',
            index=models.Index(fields=['conversation'], name='chat_bridge_conversation_idx'),
        ),
        migrations.AddIndex(
            model_name='moodconversationlink',
            index=models.Index(fields=['generation_status'], name='chat_bridge_status_idx'),
        ),
    ]