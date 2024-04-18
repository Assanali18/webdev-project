from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Post
        fields = ['id', 'body', 'user', 'created', 'image']

