from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='imani',
            email='imani@mmust.ac.ke',
            password='testpassword123',
            university='MMUST'
        )

    def test_user_creation(self):
        """Test that a user can be created correctly."""
        self.assertEqual(self.user.email, 'imani@mmust.ac.ke')
        self.assertEqual(self.user.university, 'MMUST')
        self.assertTrue(self.user.is_active)

    def test_user_str(self):
        """Test the string representation of the user."""
        self.assertEqual(str(self.user), self.user.email)
