from rest_framework import generics, permissions

from comment.models import Comment
from comment.serializers import CommentSerializer
from post.permissions import IsOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
