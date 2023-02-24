from django.contrib.auth import get_user_model
from rest_framework import generics
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response
from .serializers import ProfileSerializer
from .models import Profile



# Create your views here.

User = get_user_model()
class ProfileCreateAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        # serializer.save(user=get_object_or_404(User, id=1))
        serializer.save(user=self.request.user)