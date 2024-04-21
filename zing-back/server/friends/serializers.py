from django.db.models import Q
from rest_framework import serializers

from users.models import Users
from .models import FriendRequest, Friendship


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'is_accepted']

    def get_is_friend(self, obj):
        user = self.context['request'].user
        return Friendship.objects.filter(
            (Q(user=user) & Q(friend=obj.to_user) | Q(user=obj.to_user) & Q(friend=user)),
            is_accepted=True
        ).exists()

    def get_friend_request_sent(self, obj):
        user = self.context['request'].user
        return FriendRequest.objects.filter(from_user=user, to_user=obj.to_user, is_accepted=False).exists()

    def get_friend_request_received(self, obj):
        user = self.context['request'].user
        return FriendRequest.objects.filter(from_user=obj.from_user, to_user=user, is_accepted=False).exists()


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'profile_pic')


