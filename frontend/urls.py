from django.urls import path

from frontend import views

app_name = 'frontend'

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
]
