from django.db import models

# Create your models here.


class Chat(models.Model):
    author = models.CharField(max_length=255)
    message = models.TextField
 

    def __str__(self):
        return self.author
 
# class TimeStampModel(models.Model):
#     """
#     An abstract base class model that provides self-updating
#     ``created_at`` and ``updated_at`` fields.
#     """
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now = True)