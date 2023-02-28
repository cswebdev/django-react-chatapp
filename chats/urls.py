

from django.urls import path
from . import views

urlpatterns = [
    path('chatrooms/<int:pk>/', views.ChatRoomDetailAPIView.as_view()),
    path('chat/', views.ChatDetailAPIView.as_view()),
    path('chatrooms/', views.ChatRoomListAPIView.as_view()),
    path('', views.ChatListAPIView.as_view()),
]