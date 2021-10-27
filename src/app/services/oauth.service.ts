import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private clientId = 'YOUR_REDDIT_CLIENT_ID';
  private clientSecret = 'YOUR_REDDIT_CLIENT_SECRET';
  private redirectUri = encodeURIComponent('https://localhost:4200/oauth');
  public accessToken = '';
  public reqeustURL = '';
  public state = '';
  public tokenGranted = new Subject<boolean>()

  constructor(
    private httpClient: HttpClient
  ) { }

  getState() {
    return this.state;
  }

  generateState() {
    const state = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    this.state = state;
  }

  generateRequestURL() {
    this.generateState();
    const scope: string = [
      'identity',
      'edit',
      'flair',
      'history',
      'modconfig',
      'modflair',
      'modlog',
      'modposts',
      'modwiki',
      'mysubreddits',
      'privatemessages',
      'read',
      'report',
      'save',
      'submit',
      'subscribe',
      'vote',
      'wikiedit',
      'wikiread'
    ].join(',');

    const oauthData = {
      clientId: this.clientId,
      responseType: 'code',
      state: this.state,
      redirectUri: this.redirectUri,
      duration: 'permanent', // 'temporary', 'permanent'
      scope: scope
    }

    const url = "https://www.reddit.com/api/v1/authorize?" + [
      `client_id=${oauthData.clientId}`,
      `response_type=${oauthData.responseType}`,
      `state=${oauthData.state}`,
      `redirect_uri=${oauthData.redirectUri}`,
      `duration=${oauthData.duration}`,
      `scope=${oauthData.scope}`
    ].join('&');

    return url;
  }

  fetchToken(code: string) {
    const auth = btoa(`${this.clientId}:${this.clientSecret}`);
    const url = 'https://www.reddit.com/api/v1/access_token';
    const data = [
        'grant_type=authorization_code',
        `code=${code}`,
        `&redirect_uri=${this.redirectUri}`
      ].join('&');
    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };

    this.httpClient.post(url, data, { headers })
      .subscribe((response: any): void => {
        const hasToken = response.hasOwnProperty('access_token');
        if (hasToken) {
          this.accessToken = response.access_token;
          localStorage.setItem('access_token', this.accessToken);
        }
        this.tokenGranted.next(hasToken);
      });
  }

  confirmToken() {
    return this.accessToken !== '';
  }

  getHeaders() {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `bearer ${this.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return headers;
  }
}
