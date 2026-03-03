from django.urls import path
from django.contrib.auth.views import LogoutView
from django.shortcuts import redirect
from . import views

urlpatterns = [
    # Auth Routes
    path('login/', views.MindMateLoginView.as_view(), name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('me/', views.user_me_view, name='user_me'),
    
    # Bridge to React Frontend (Local Dev only)
    path('dashboard/', lambda r: redirect('http://localhost:3000/dashboard'), name='dashboard'),
    
    # Root redirect
    path('', views.MindMateLoginView.as_view(), name='base_login'),
]

