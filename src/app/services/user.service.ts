import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: boolean = false;
  activatedLogin = new Subject<boolean>();
  state: string = 'bad'; // Oauth State
  code: string = 'bad'; // Oauth Token

  constructor() { }

  login() {
    this.changeStatus(true);
  }

  logout() {
    this.changeStatus(false);
  }

  changeStatus(newStatus: boolean) {
    this.loggedIn = newStatus;
    this.activatedLogin.next(this.loggedIn);
  }

  registerOauth(accessToken: string) {
    console.log("inRegisterOauth");
    this.code = accessToken;
    this.login();
  }
}
