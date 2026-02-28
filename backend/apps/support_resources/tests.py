from django.test import TestCase
from .models import SupportResource

class SupportResourceTestCase(TestCase):
    def test_resource_creation(self):
        """Test that a support resource can be created correctly."""
        resource = SupportResource.objects.create(
            name='MMUST Counseling Center',
            type='campus',
            phone='0700123456',
            description='In-person counseling for students.'
        )
        self.assertEqual(resource.name, 'MMUST Counseling Center')
        self.assertEqual(resource.type, 'campus')
        self.assertTrue(resource.is_active)

    def test_resource_str(self):
        """Test the string representation of the resource."""
        resource = SupportResource.objects.create(
            name='National Hotline',
            type='hotline'
        )
        self.assertEqual(str(resource), "Hotline: National Hotline")
