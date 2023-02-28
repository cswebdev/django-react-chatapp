from django.urls import path, include


app_name="api_v1"   


urlpatterns = [
   path('chats/', include('chats.urls')),
   path('', include('accounts.urls', namespace = "accounts")),
  
]
