from django.core.management.base import BaseCommand
from apps.users.models import User

class Command(BaseCommand):
    help = 'Create a test user for development'

    def handle(self, *args, **options):
        email = 'test@mmust.ac.ke'
        
        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.WARNING(f'User {email} already exists!')
            )
            user = User.objects.get(email=email)
        else:
            user = User.objects.create_user(
                username=email,
                email=email,
                password='password123',
                full_name='Test Student'
            )
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created user: {email}')
            )
        
        self.stdout.write(f'Email: {user.email}')
        self.stdout.write(f'Username: {user.username}')
        self.stdout.write('Password: password123')