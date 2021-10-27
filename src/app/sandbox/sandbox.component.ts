/**
 * This component is for testing, features are extracted into the core code
 * as they're ready.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment.interface';
import { OauthService } from '../services/oauth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  subreddit: string = 'webdev'; // Placeholder
  keyword: string = '';
  oauthUrl: string = ''; // For link.
  oauthStatus: string = 'Disconnected';

  constructor(
    private searchService: SearchService,
    private oauthService: OauthService
  ) { }

  ngOnInit(): void {
    // Temporary, need DB connectivity for persistence.
    const localToken = localStorage.getItem('access_token');
    if (localToken) {
      this.oauthStatus = "Connected";
      this.oauthService.accessToken = localToken;
    } else {
      this.oauthUrl = this.oauthService.generateRequestURL();
    }

    this.searchService.activatedSearch$.subscribe((observer) => {
      this.comments = observer;
    });

    // Initial population.
    this.searchService.loadData();
  }

  ngOnDestroy(): void {
    // Does this automatically unsubscribe?
    // this.searchService.activatedSearch$.unsubscribe();
  }

  tempOauthDisconnect() {
    // Implement testing url
  }

  public increment: number = 0;
  buttonClickHandler(): void {
    this.increment++;
  }

  // Move to setter of searchService
  onSearch(): void {
    this.searchService.keyword = this.keyword;
    this.searchService.subreddit = this.subreddit;
    this.searchService.loadData();
  }
}
