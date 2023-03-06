#from django.shortcuts import render
#from django.views.generic import ListView

from  rest_framework import generics
from  django.urls import path
from .models import Chat, ChatRoom
from .serializers import ChatSerializer, ChatRoomSerializer
from .permissions import IsAuthorOrReadOnly
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class ChatListAPIView(generics.ListCreateAPIView):
    # queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
       
    def get_queryset(self):
        return Chat.objects.filter(room_id=self.kwargs['room_id'])
     
class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class ChatRoomListAPIView(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()   
    serializer_class = ChatRoomSerializer
    
class ChatRoomDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatRoom.objects.all()   
    serializer_class = ChatRoomSerializer

    