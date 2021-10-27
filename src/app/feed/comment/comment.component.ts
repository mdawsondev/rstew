import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: Comment | any = {};

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  postResponse(id: any, text: string) {
    this.commentService.postReply(id, text);
  }
}
