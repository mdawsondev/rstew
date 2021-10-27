import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.activatedLogin.subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }

  onLogin() {
    this.userService.login()
  }

  onLogout() {
    this.userService.logout()
  }
}
