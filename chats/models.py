from django.db import models
from django.conf import settings


# Create your models here.

class Chat(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now = True, null=True)
    room = models.ForeignKey("ChatRoom", on_delete=models.CASCADE)

    def __str__(self):
        return self.message[:100]
    
class ChatRoom(models.Model): 
    name = models.CharField(max_length=255)
    

    def __str__(self)  :
        return self.name
    


 