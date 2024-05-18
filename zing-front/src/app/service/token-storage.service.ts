import {Injectable} from '@angular/core';

const TOKEN_KEY = 'userToken';
const USER_KEY = 'userData';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }


  public getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return undefined;
  }

  public saveUser(user:any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(USER_KEY);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserId(){
    if (typeof window !== 'undefined' && window.localStorage) {
      const userDataString = localStorage.getItem('userData');
      let userId
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userId = userData.id;
      }

      return userId;
    }

  }


  logOut(): void {
    localStorage.clear();
  }
}
