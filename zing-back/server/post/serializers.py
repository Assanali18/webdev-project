# from rest_framework import serializers
#
# from post.models import Post
#
#
# class PostSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=200)
#     create_date = serializers.DateTimeField()
#     likes = serializers.IntegerField(default=0)
#     image = serializers.ImageField()
#     author = serializers.CharField(max_length=100)
#
#     def create(self, validated_data):
#         instance = Post.objects.create(**validated_data)
#         instance.save()
#         return instance
#
