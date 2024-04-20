import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notification} from "../models/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  public showSnackBar(message: string): void {
    this.snackbar.open(message, undefined, {
      duration: 2000
    });
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('http://localhost:8000/notifications/');
  }
}
