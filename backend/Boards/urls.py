# Boards/urls.py
from django.urls import path
from .views import (
    BoardListCreateView,
    BoardDetailPromptsView,
    PromptListCreateView,
)

urlpatterns = [
    path('boards/', BoardListCreateView.as_view(), name='board-list-create'),
    path('boards/<slug:slug>/prompts/', BoardDetailPromptsView.as_view(), name='board-prompts'),
    path('prompts/', PromptListCreateView.as_view(), name='prompt-list-create'),
]
