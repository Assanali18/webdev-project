from django.urls import path

from comment.views import GenericCommentListCreateView
from .views import like_post, GenericPostCreateListView, GenericPostDetailView

app_name = 'api/posts/'
urlpatterns = [
    path('', GenericPostCreateListView.as_view(), name='post-list-create'),
    path('<int:pk>', GenericPostDetailView.as_view(), name='post-retrieve-update-delete'),
    path('<int:pk>/like/', like_post, name='like-post'),
    path('<int:pk>/comments/', GenericCommentListCreateView.as_view(), name='comment-list-create'),
]
