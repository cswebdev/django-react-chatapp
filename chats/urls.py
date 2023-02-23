from django.urls import path
from . import views

urlpatterns = [
    path('<int:chat>/message/', views.ChatDetailAPIView.as_view()),
    path('<int:pk>/', views.ChatListAPIView.as_view()),
    path('', views.ChatListAPIView.as_view()),
]