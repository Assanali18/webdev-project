import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = ''

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public login(user:any): Observable<any>{
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register(user:any): Observable<any>{
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      username: user.user,
      firstname: user.firstname,
      lastname: user.password,
      confirmPassword: user.confirmPassword,
    });
  }
}
