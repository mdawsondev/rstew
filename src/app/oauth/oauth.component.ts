import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../services/oauth.service';
import { UserService } from '../services/user.service';

/** This component received the initial OAuth response from the saved redirect URI,
 * and needs to send out a secondary POST to retrieve the user's OAuth token.
 */

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {
  private code: string = '';
  private state: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private oauthService: OauthService
    ) { }

  ngOnInit(): void {
    const dataConfirmed = this.confirmData();
    if (dataConfirmed) this.oauthService.fetchToken(this.code);

    this.oauthService.tokenGranted.subscribe((didGrant: boolean) => {
      didGrant
        ? this.userService.registerOauth(this.oauthService.accessToken)
        : alert("No grant, much oops.");

      this.router.navigate(['sandbox']);
    })
  }

  confirmData(): boolean {
    const code = this.route.snapshot.queryParams['code'];
    const state = this.route.snapshot.queryParams['state'];

    if (!!code && !!state) {
      this.code = code;
      this.state = state;

      // State is not persisting through oauthService since it's lost on the page reload,
      // need to use sessions or cookies for this check once addressing persistence.
      // alert(`This state: ${this.state}, that state: ${this.oauthService.getState()}`)
      return true;
    }

    return false;
  }
}


// this.userService.registerOauth(response.access_token);
