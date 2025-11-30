# backend/config/urls.py
from django.contrib import admin
from django.urls import path, include
from Users.views import register_user, login_user, me

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/register/', register_user),
    path('api/auth/login/', login_user),
    path('api/auth/me/', me),

    # 👇 add this line
    path('api/', include('Boards.urls')),
]
