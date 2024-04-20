from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from notification.models import Notification
from users.models import Users
from .models import FriendRequest
from .serializers import FriendRequestSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class SendFriendRequestView(generics.CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        to_user = get_object_or_404(Users, pk=request.data.get('to_user_id'))
        if request.user == to_user:
            return Response({"error": "You cannot send a friend request to yourself."}, status=status.HTTP_400_BAD_REQUEST)
        if FriendRequest.objects.filter(from_user=request.user, to_user=to_user).exists():
            return Response({"error": "Friend request already sent."}, status=status.HTTP_409_CONFLICT)
        FriendRequest.objects.create(from_user=request.user, to_user=to_user)
        Notification.objects.create(
            type='follow',
            to_user=to_user,
            from_user=request.user,
            post=None,
        )
        return Response(status=status.HTTP_201_CREATED)


class FriendRequestListView(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FriendRequest.objects.filter(to_user=self.request.user, is_accepted=False)


@api_view(['POST'])
def accept_friend_request(request):
    user_id = request.data.get('userId')
    from_user = get_object_or_404(Users, pk=user_id)
    to_user = request.user
    return Response({'status': 'Friend request accepted'})