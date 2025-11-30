# Boards/serializers.py
from django.utils.text import slugify
from rest_framework import serializers

from .models import Board, Prompt, UserProfile


class BoardSerializer(serializers.ModelSerializer):
    prompt_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Board
        fields = ["id", "name", "slug", "description", "prompt_count"]
        extra_kwargs = {
            "slug": {"required": False},  # allow omitting slug from POST
        }

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = slugify(validated_data["name"])
        return super().create(validated_data)


class PromptSerializer(serializers.ModelSerializer):
    # write-only slug for creating; read-only nested board for display
    board_slug = serializers.SlugField(write_only=True)
    board = BoardSerializer(read_only=True)
    author_name = serializers.CharField(
        source="author.display_name", read_only=True
    )

    class Meta:
        model = Prompt
        fields = [
            "id",
            "title",
            "body",
            "description",
            "model",
            "category",
            "course_code",
            "difficulty",
            "board",
            "board_slug",
            "author_name",
            "created_at",
        ]

    def create(self, validated_data):
        # pull out slug from POST data
        board_slug = validated_data.pop("board_slug")
        board = Board.objects.get(slug=board_slug)

        # TEMP: attach prompts to a dummy user until real auth is wired
        user_profile = UserProfile.objects.first()
        if user_profile is None:
            user_profile = UserProfile.objects.create(
                firebase_uid="demo-user",
                display_name="Demo User",
                email="demo@example.com",
            )

        return Prompt.objects.create(
            board=board,
            author=user_profile,
            **validated_data,
        )
