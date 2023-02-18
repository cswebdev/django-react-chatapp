from django.urls import path
from . import views



urlpatters = [
    path('', views.IndexView.as_view()),
]