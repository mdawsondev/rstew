import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private oauthService: OauthService
  ) { }

  postReply(commentId: string, newComment: string) {
    const text = encodeURIComponent(newComment);
    const fullname = "t1_" + commentId; // Need to pull from interfaces.
    const data = [
      "api_type='json'",
      `text=${text}`,
      `thing_id=${fullname}`
    ].join('&');


    // Move api endpoints to enum.
    this.httpClient.post(`https://oauth.reddit.com/api/comment`, data, { headers: this.oauthService.getHeaders() })
      .subscribe((response: any) => {
        const notification = response.success
          ? "Success, comment submitted. 👍"
          : "Failed to post, are you connected? 👎"

        alert(notification);
      })
  }
}
