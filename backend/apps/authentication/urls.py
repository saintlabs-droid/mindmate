from django.urls import path
from . import views

urlpatterns = [
    # http://127.0.0.1:8000/login/
    path('login/', views.login_view, name='login'),
    
    # http://127.0.0.1:8000/signup/
    path('signup/', views.signup_view, name='signup'),
    
    # This makes the base URL (http://127.0.0.1:8000/) go to the login page
    path('', views.login_view, name='base_login'),
]