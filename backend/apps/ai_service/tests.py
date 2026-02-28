from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import ReflectionPrompt, ChatMessage

User = get_user_model()

class AIServiceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='imani',
            email='imani@mmust.ac.ke',
            password='testpassword123'
        )

    def test_reflection_prompt_creation(self):
        prompt = ReflectionPrompt.objects.create(
            user=self.user,
            prompt_text='How did you manage stress today?'
        )
        self.assertEqual(prompt.prompt_text, 'How did you manage stress today?')
        self.assertFalse(prompt.is_answered)

    def test_chat_message_creation(self):
        msg = ChatMessage.objects.create(
            user=self.user,
            sender='user',
            content='I feel stressed.'
        )
        self.assertEqual(msg.content, 'I feel stressed.')
        self.assertEqual(msg.sender, 'user')
