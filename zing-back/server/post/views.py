from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.decorators import api_view

from . import permissions
from rest_framework import permissions

from .models import Post
from .permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]


class PostById(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['pk']
        return Post.objects.filter(user_id=user_id)


@api_view(['POST'])
def like_post(request, pk):
    post = generics.get_object_or_404(Post, pk=pk)
    user = request.user

    if post.userLiked.filter(id=user.id).exists():
        post.userLiked.remove(user)
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        post.userLiked.add(user)
        return Response(status=status.HTTP_201_CREATED)
