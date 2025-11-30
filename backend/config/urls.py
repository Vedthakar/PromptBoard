from django.contrib import admin
from django.urls import path, include  # ✅ use Django's include

from Users.views import register_user, login_user, me

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth API
    path('api/auth/register/', register_user),
    path('api/auth/login/', login_user),
    path('api/auth/me/', me),

    # If/when you have a boards app with backend routes, you can add:
    # path('', include('boards.urls')),  # <-- note: empty string, and app name should be lowercase 'boards'
]
