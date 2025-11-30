from rest_framework import generics, permissions
from django.db.models import Count, Q
from .models import Board, Prompt
from .serializers import BoardSerializer, PromptSerializer

class BoardListView(generics.ListAPIView):
    serializer_class = BoardSerializer

    def get_queryset(self):
        return Board.objects.annotate(prompt_count=Count('prompts'))


class BoardDetailPromptsView(generics.ListAPIView):
    serializer_class = PromptSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        category = self.request.query_params.get('category')
        model = self.request.query_params.get('model')
        search = self.request.query_params.get('q')

        qs = Prompt.objects.filter(board__slug=slug)

        if category and category.lower() != 'all':
            qs = qs.filter(category__iexact=category)
        if model and model.lower() != 'all':
            qs = qs.filter(model__iexact=model)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(body__icontains=search)
            )
        return qs.order_by('-created_at')


class PromptListCreateView(generics.ListCreateAPIView):
    serializer_class = PromptSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        search = self.request.query_params.get('q')
        board_slug = self.request.query_params.get('board')
        qs = Prompt.objects.all()

        if board_slug:
            qs = qs.filter(board__slug=board_slug)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(body__icontains=search)
            )
        return qs.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save()
