import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {

  @Input() comment: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  getCommentDate(){
    const now = new Date();
    const commentDate = new Date(this.comment.datePublication);
    const difference = now.getTime() - commentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

  likeComment(){

  }

  respondToComment(){

  }

  shareComment(){

  }

}
