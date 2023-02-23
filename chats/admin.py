from django.contrib import admin
from django.contrib.auth import get_user
from .models import Chat
#from accounts.models import User

# Register your models here.

admin.site.register(Chat)
