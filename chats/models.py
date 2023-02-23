from django.db import models
from django.conf import settings


# Create your models here.

class Chat(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now = True, null=True)
 

    def __str__(self):
        return self.author
    

 
# class TimeStampModel(models.Model):
#     """
#     An abstract base class model that provides self-updating
#     ``created_at`` and ``updated_at`` fields.
#     """
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now = True)

    

# class MyUserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         """
#         creates and saves a User with the data that's inputted by user. 

#         """
#         if not email:
#             raise ValueError('Users must have an email address')
        
#         user = self.model(
#             email = self.normalize_email(email)
#         )