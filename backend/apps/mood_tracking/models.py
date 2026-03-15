from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django_cryptography.fields import encrypt
import uuid

class MoodEntry(models.Model):
    STRESS_CATEGORIES = [
        ('Academics', 'Academics'),
        ('Finances', 'Finances'),
        ('Relationships', 'Relationships'),
        ('Family', 'Family'),
        ('Career', 'Career'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mood_entries')

    mood_level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    stress_category = models.CharField(max_length=20, choices=STRESS_CATEGORIES)
    note = encrypt(models.TextField(blank=True, max_length=500))
    sound_note = models.FileField(upload_to='mood_audio/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', '-timestamp']),
        ]

    def __str__(self):
        return f"{self.user.email} - Mood {self.mood_level} ({self.timestamp.date()})"
