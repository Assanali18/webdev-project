import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {Notification} from "../models/Notification";
import {HttpClient} from "@angular/common/http";
import {FriendRequestService} from "../service/friend-request.service";
import {FriendStatus} from "../models/Friend";
import {TokenStorageService} from "../service/token-storage.service";

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
    private http: HttpClient,
    private friendService: FriendRequestService,
    private tokenService: TokenStorageService,
    ) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
      console.log(this.notifications)
      this.notifications.forEach(notification =>{
        if(notification.type === 'follow'){

          this.friendService.getFriendRequestStatus(notification.from_user.username)
            .subscribe(status =>{
              console.log(status)
              this.friendStatus = status;
            })
        }
      })
    });

  }
  acceptRequest(userId: number, username: string) {
    this.http.post(`http://localhost:8000/accept-friend-request/`, { userId }).subscribe({
      next: () => {
        console.log('Friend request accepted');
        this.friendStatus.is_friend = true;
        this.friendStatus.friend_request_received = false;
      },
      error: (error) => console.error('Error accepting friend request', error)
    });
  }

}
