from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import MoodEntry

User = get_user_model()

class MoodEntryTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='imani',
            email='imani@mmust.ac.ke',
            password='testpassword123'
        )

    def test_mood_entry_creation(self):
        """Test that a mood entry can be created correctly."""
        entry = MoodEntry.objects.create(
            user=self.user,
            mood_level=4,
            stress_category='Academics',
            note='Feeling good about projects.'
        )
        self.assertEqual(entry.mood_level, 4)
        self.assertEqual(entry.stress_category, 'Academics')
        self.assertEqual(entry.user, self.user)

    def test_mood_entry_str(self):
        """Test the string representation of the mood entry."""
        entry = MoodEntry.objects.create(
            user=self.user,
            mood_level=3,
            stress_category='Finances'
        )
        expected_str = f"{self.user.email} - Mood 3 ({entry.timestamp.date()})"
        self.assertEqual(str(entry), expected_str)
