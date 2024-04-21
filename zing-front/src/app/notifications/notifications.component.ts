import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {Notification} from "../models/Notification";
import {FriendRequestService} from "../service/friend-request.service";
import {FriendStatus} from "../models/Friend";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  notifications: Notification[] = [];
  friendStatus!:FriendStatus;

  constructor(
    private notificationService: NotificationService,
    private friendService: FriendRequestService,
    ) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
      console.log(this.notifications)
    });

  }
  acceptRequest(userId: number, index: number) {
    this.friendService.acceptSendFriendRequest(userId).subscribe({
      next: () => {
        console.log('Friend request accepted');
        this.notifications.splice(index,1);
      },
      error: (error) => console.error('Error accepting friend request', error)
    });
  }

}
