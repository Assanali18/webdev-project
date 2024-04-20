import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  private apiUrl = 'http://localhost:8000/friend-requests/';

  constructor(private http: HttpClient) {}

  sendFriendRequest(toUserId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}send/`, { to_user_id: toUserId });
  }

  getFriendRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list/`);
  }
}
