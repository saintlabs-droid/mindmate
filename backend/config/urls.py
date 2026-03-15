"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # --- Frontend/Page Routes ---
    # This allows http://127.0.0.1:8000/login and /signup to work
    path('', include('apps.authentication.urls')),

    # --- Existing API Routes ---
    path('api/auth/', include('apps.authentication.urls')), # Points to the same app
    path('api/moods/', include('apps.mood_tracking.urls')),
    path('api/insights/', include('apps.insights.urls')),
    path('api/ai/', include('apps.ai_service.urls')),
    path('api/resources/', include('apps.support_resources.urls')),
    path('api/users/', include('apps.users.urls')),
<<<<<<< HEAD
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
]
>>>>>>> 0c03dc4cec3fd516e9669103368782fccd43cffb
