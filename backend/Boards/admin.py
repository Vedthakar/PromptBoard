from django.contrib import admin
from .models import Board, Prompt, UserProfile

@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    search_fields = ("name", "slug")

@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    list_display = ("title", "board", "model", "category", "created_at")
    list_filter = ("model", "category", "board")
    search_fields = ("title", "description", "body")

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("email", "display_name", "firebase_uid")
    search_fields = ("email", "display_name", "firebase_uid")
