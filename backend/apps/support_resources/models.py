from django.db import models
import uuid

class SupportResource(models.Model):
    RESOURCE_TYPES = [
        ('campus', 'Campus'),
        ('national', 'National'),
        ('hotline', 'Hotline'),
        ('online', 'Online'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    description = models.TextField()
    availability = models.CharField(max_length=100, default="24/7")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.type.capitalize()}: {self.name}"
