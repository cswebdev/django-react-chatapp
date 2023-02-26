from django.contrib import admin
from .models import Chat,ChatRoom
#from accounts.models import User

# Register your models here.

admin.site.register(Chat)
admin.site.register(ChatRoom)
