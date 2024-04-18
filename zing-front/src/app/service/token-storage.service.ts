import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'userData';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserId(){
    const userDataString = localStorage.getItem('userData');
    let userId
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      userId = userData.id;
    }

    return userId;
  }


  logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
