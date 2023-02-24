#from django.shortcuts import render
#from django.views.generic import ListView

from  rest_framework import generics
from  django.urls import path
from .models import Chat
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import ChatSerializer
# Create your views here.

class ChatListAPIView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


# class ChatListView(ListView):
#     model = Chat
    

