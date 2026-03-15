import json
import base64
from urllib.parse import urlencode

from django.shortcuts import render, redirect
from django.contrib.auth import login, logout as auth_logout
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .forms import StudentSignUpForm


def _build_react_redirect(user, base_url='http://localhost:3000/dashboard'):
    """
    Encodes user profile as a base64 URL param to hand off state to React.
    """
    payload = {
        'fullName': user.full_name or user.get_full_name() or 'MindMate User',
        'email': user.email,
        'university': getattr(user, 'university', ''),
        'profilePic': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    }
    encoded = base64.urlsafe_b64encode(
        json.dumps(payload).encode()
    ).decode()
    return f"{base_url}?session={encoded}"


class MindMateLoginView(LoginView):
    template_name = 'profilemanagement/login.html'
    redirect_authenticated_user = False

    def get_success_url(self):
        return _build_react_redirect(self.request.user)


def signup_view(request):
    if request.method == 'POST':
        form = StudentSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(_build_react_redirect(user))
    else:
        form = StudentSignUpForm()

    return render(request, 'profilemanagement/signup.html', {'form': form})


def logout_view(request):
    """
    Custom logout view that handles GET requests.
    Django 5.x LogoutView requires POST, which is hard to trigger
    reliably from an SPA sidebar without CSRF headaches.
    """
    auth_logout(request)
    # Redirect back to the React landing page
    return redirect('http://localhost:3000/')


@login_required
def user_me_view(request):
    return JsonResponse({
        'id': str(request.user.id),
        'fullName': request.user.full_name or request.user.get_full_name() or 'MindMate User',
        'email': request.user.email,
        'university': getattr(request.user, 'university', ''),
    })
