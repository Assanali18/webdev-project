# from django.shortcuts import render
# from django.views.generic import ListView
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from post import serializers
# from post.models import Post
#
#
# @api_view(["GET"])
# def post_list(request):
#     if request.method == "GET":
#         posts = Post.objects.all()
#         serializer = serializers.PostSerializer(posts, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
