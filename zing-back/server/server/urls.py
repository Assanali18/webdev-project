from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include, reverse_lazy
from django.views.generic.base import RedirectView

from users.views import UserLogIn, UserSignUpAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-user-login/', UserLogIn.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),

    path('api/users/', include('users.urls')),
    path('api/posts/', include('post.urls')),
    path('api/comments/', include('comment.urls')),
    path('api/notifications/', include('notification.urls')),
    path('api/search/', include('search.urls')),
    path('api/friend-requests/', include('friends.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
