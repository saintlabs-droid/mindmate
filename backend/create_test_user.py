#!/usr/bin/env python
import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User

def create_test_user():
    # Check if test user already exists
    if User.objects.filter(email='test@mmust.ac.ke').exists():
        print("Test user already exists!")
        user = User.objects.get(email='test@mmust.ac.ke')
        print(f"Email: {user.email}")
        print(f"Username: {user.username}")
        return user
    
    # Create test user
    user = User.objects.create_user(
        username='test@mmust.ac.ke',
        email='test@mmust.ac.ke',
        password='password123',
        full_name='Test Student'
    )
    print("Test user created successfully!")
    print(f"Email: {user.email}")
    print(f"Username: {user.username}")
    print("Password: password123")
    return user

if __name__ == '__main__':
    create_test_user()