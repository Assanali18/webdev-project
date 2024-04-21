from django.conf import settings
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter

import post
from friends.views import SendFriendRequestView, accept_friend_request, FriendListView, FriendshipStatusView
from notification.views import NotificationListView
from post import views
from post.views import like_post, PostByUsername
from search.views import UserSearchView
from users.views import UserViewSet, UserLogIn, UserSignUpAPIView, GenericUserDetail
from comment.views import CommentList, CommentDetail

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-user-login/', UserLogIn.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>', views.PostDetail.as_view()),
    path('user/<int:pk>/posts', views.PostById.as_view()),
    path('posts/<int:pk>/like/', like_post, name='like-post'),
    path('posts/<int:pk>/comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),
    path('notifications/', NotificationListView.as_view()),
    path('users/search/', UserSearchView.as_view(), name='user-search'),
    path('users/<str:username>/', GenericUserDetail.as_view(), name='public-user'),
    path('users/<str:username>/posts/', PostByUsername.as_view(), name='public-user'),
    path('users/<str:username>/comments', GenericUserDetail.as_view(), name='public-user'),
    path('friend-requests/send/', SendFriendRequestView.as_view(), name='public-user'),
    path('friend-requests/list/', GenericUserDetail.as_view(), name='public-user'),
    path('accept-friend-request/', accept_friend_request, name='public-user'),
    path('friends/', FriendListView.as_view(), name='friend_list'),
    path('users/<str:username>/friendship-status/', FriendshipStatusView.as_view(), name='friendship-status'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
