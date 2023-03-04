from rest_framework import serializers

from .models import Chat, ChatRoom
# from .models import User

class ChatSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source="author.username")
    class Meta:
        model = Chat
        fields = '__all__'

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ChatRoom
        fields = '__all__' 