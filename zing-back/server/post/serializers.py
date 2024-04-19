from rest_framework import serializers

from post.models import Post
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    userLiked = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'body', 'user', 'created', 'image', 'likes', 'userLiked']

