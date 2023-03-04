

from django.urls import path
from . import views

urlpatterns = [
    
    path('chatrooms/<int:pk>/', views.ChatRoomDetailAPIView.as_view()),
    path('chatrooms/', views.ChatRoomListAPIView.as_view()),
    path('chats/<int:pk>/', views.ChatDetailAPIView.as_view()),
    path('chats/<int:room_id>', views.ChatListAPIView.as_view()),
]