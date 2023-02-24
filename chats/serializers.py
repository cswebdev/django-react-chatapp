from rest_framework import serializers

from .models import Chat
# from .models import User

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

