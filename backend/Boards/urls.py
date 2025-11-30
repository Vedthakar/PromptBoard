from django.contrib import admin
from django.urls import path
from Boards.views import BoardListView, BoardDetailPromptsView, PromptListCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/boards/', BoardListView.as_view()),
    path('api/boards/<slug:slug>/prompts/', BoardDetailPromptsView.as_view()),
    path('api/prompts/', PromptListCreateView.as_view()),
]
