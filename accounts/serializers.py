from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token
# from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import TokenSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")

    class Meta:
        model = Profile
        fields = '__all__'
        # depth = 1


class CustomTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + ('username',)