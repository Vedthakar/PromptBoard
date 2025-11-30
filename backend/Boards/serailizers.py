from rest_framework import serializers
from .models import Board, Prompt
# serializers.py
from rest_framework import serializers
from django.utils.text import slugify
from .models import Board, Prompt

class BoardSerializer(serializers.ModelSerializer):
    prompt_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'name', 'slug', 'description', 'prompt_count']
        extra_kwargs = {
            'slug': {'required': False},  # allow omitting slug from POST
        }

    def create(self, validated_data):
        if not validated_data.get('slug'):
            validated_data['slug'] = slugify(validated_data['name'])
        return super().create(validated_data)


class PromptSerializer(serializers.ModelSerializer):
    board_slug = serializers.CharField(source="board.slug", read_only=True)

    board = BoardSerializer(read_only=True)
    author_name = serializers.CharField(source='author.display_name', read_only=True)

    class Meta:
        model = Prompt
        fields = [
            'id', 'title', 'body', 'description',
            'model', 'category', 'course_code', 'difficulty',
            'board', 'board_slug', 'author_name',
            'created_at',
        ]

    def create(self, validated_data):
        board_slug = validated_data.pop('board_slug')
        request = self.context['request']
        user_profile = request.user  # set via Firebase auth (see next section)

        from .models import Board
        board = Board.objects.get(slug=board_slug)
        return Prompt.objects.create(
            board=board,
            author=user_profile,
            **validated_data
        )
