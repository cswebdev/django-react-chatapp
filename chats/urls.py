


from .views import ChatListAPIView, ChatDetailAPIView

from django.urls import path, include
from . import views

urlpatterns = [

    path('<int:chat>/<int:pk>/', views.ChatDetailAPIView.as_view()),
    path('', views.ChatListAPIView.as_view()),
]