import { Comment, Listing, RedditResponse } from 'src/app/interfaces/comment.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private comments: Comment[] = [];
  private activatedSearch = new Subject<Comment[]>();
  public subreddit: string = 'all';
  public keyword: string = '';

  // Does .asObservable() auto-unsubscribe?
  public activatedSearch$: Observable<Comment[]> = this.activatedSearch.asObservable();

  constructor(private httpClient: HttpClient) { }

  loadData() {
    // Move to live reloader, setInterval currently stacks requests here and is not expandable.
    const subreddit = this.subreddit;
    const keyword = this.keyword;

    this.httpClient
      .get(`https://www.reddit.com/r/${subreddit}/comments.json`)
      .subscribe((response: any) => {
        const data: Listing = response.data;
        const comments: RedditResponse<Comment>[] = data.children;
        const newComments = comments.map((comment) => comment.data);
        this.comments = [
          ...newComments.filter(comment => comment.body.includes(keyword)),
          ...this.comments,
        ];

        // Limit to 5 latest comments.
        this.comments = this.comments.slice(0, 5);

        this.updateSearch();
      });
  }

  updateSearch() {
    this.activatedSearch.next(this.comments);
  }
}
