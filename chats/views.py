#from django.shortcuts import render
#from django.views.generic import ListView

from  rest_framework import generics
from  django.urls import path
from .models import Chat, ChatRoom
from .serializers import ChatSerializer, ChatRoomSerializer
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class ChatListAPIView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

class ChatRoomListAPIView(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()   
    serializer_class = ChatRoomSerializer
    
class ChatRoomDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatRoom.objects.all()   
    serializer_class = ChatRoomSerializer