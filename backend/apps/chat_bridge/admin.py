"""
Chat Bridge Admin Configuration

Admin interface for managing mood conversation links and monitoring
the conversation generation process.
"""

from django.contrib import admin
from .models import MoodConversationLink


@admin.register(MoodConversationLink)
class MoodConversationLinkAdmin(admin.ModelAdmin):
    """Admin interface for MoodConversationLink model."""
    
    list_display = [
        'mood_entry',
        'conversation',
        'generation_status',
        'created_at',
        'updated_at'
    ]
    list_filter = [
        'generation_status',
        'created_at',
        'updated_at'
    ]
    search_fields = [
        'mood_entry__user__email',
        'conversation__id'
    ]
    readonly_fields = [
        'id',
        'created_at',
        'updated_at'
    ]
    
    fieldsets = (
        ('Link Information', {
            'fields': ('id', 'mood_entry', 'conversation', 'starter_message')
        }),
        ('Status', {
            'fields': ('generation_status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )