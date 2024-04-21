from django.urls import path

from .views import NotificationListView

app_name = 'api/notifications/'
urlpatterns = [
    path('', NotificationListView.as_view()),
]
