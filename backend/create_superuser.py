import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User

# Create superuser
if not User.objects.filter(email='admin@test.com').exists():
    User.objects.create_superuser(
        username='admin@test.com',
        email='admin@test.com', 
        password='admin123',
        full_name='Admin User'
    )
    print("Superuser created: admin@test.com / admin123")
else:
    print("Superuser already exists")

# Create test user
if not User.objects.filter(email='test@test.com').exists():
    User.objects.create_user(
        username='test@test.com',
        email='test@test.com',
        password='test123',
        full_name='Test User'
    )
    print("Test user created: test@test.com / test123")
else:
    print("Test user already exists")