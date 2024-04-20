import { Component } from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {Notification} from "../models/Notification";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: Notification[] = [];
  isAccepted = false;

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
      console.log(this.notifications)
    });
  }
  acceptRequest(userId: number) {
    this.http.post(`http://localhost:8000/accept-friend-request/`, { userId }).subscribe({
      next: () => {
        console.log('Friend request accepted');
        this.isAccepted = true;
      },
      error: (error) => console.error('Error accepting friend request', error)
    });
  }

}
