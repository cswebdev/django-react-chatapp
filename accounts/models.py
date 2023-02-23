from django.db import models
from django.contrib.auth.models import User
from django.conf import settings    

# Create your models here.

#avatar = models.ImageField(upload_to='accounts/')






# class User(AbstractUser):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
#     display_name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.user


# using Django forms 
# https://docs.djangoproject.com/en/4.1/topics/forms/ 
# class User(models.Model):
#     user_name = models.CharField(max_length=255)
#     email = models.EmailField()
#     password = models.CharField(max_length=30)
    
#     def __str__(self):
#         return self.user_name


# class Profile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
#     avatar = models.ImageFriend(upload_to='accounts/')
#     display_name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.user