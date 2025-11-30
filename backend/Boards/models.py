from django.db import models

class UserProfile(models.Model):
    # Firebase UID as primary key-ish link
    firebase_uid = models.CharField(max_length=128, unique=True)
    display_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.display_name or self.email


class Board(models.Model):
    name = models.CharField(max_length=128)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Prompt(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()  # actual prompt text
    description = models.TextField(blank=True)
    model = models.CharField(max_length=64)     # e.g. "GPT", "Gemini"
    category = models.CharField(max_length=64)  # "study", "resume", etc.
    course_code = models.CharField(max_length=32, blank=True)
    difficulty = models.CharField(max_length=32, blank=True)

    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='prompts')
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='prompts')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
