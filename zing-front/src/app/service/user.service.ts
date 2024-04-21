import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from "../models/User";
import {Friend} from "../models/Friend";
import {TokenStorageService} from "./token-storage.service";

const USER_API = 'http://127.0.0.1:8000/api/users/28/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }


  getUserProfile(userId: string|null): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/users/${userId}/`);
  }
  getUserProfileByUsername(username: string|null): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/users/${username}/`);
  }

  updateUserImageProfile(user: User, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profile_pic', file, file.name);
    return this.http.put(`http://localhost:8000/api/users/${user.id}/`, formData);
  }

  isCurrentUser(username: string|null): Observable<boolean> {
    return of(this.tokenService.getUserName() === username);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  updateUser(user: any): Observable<any> {
    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      bio: user.bio,
    };
    return this.http.put(`http://localhost:8000/api/users/${user.id}/`, userData);
  }

  searchUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/users/search/?q=${query}`);
  }

  getFriendList(){
    return this.http.get<Friend[]>('http://localhost:8000/friends/')
  }


}
