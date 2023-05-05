import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from "../../../services/comment/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {

  @Input() comment: any = {};
  commentLiked: boolean = false;
  numberOfLikes: number = 0;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  getCommentDate(){
    const now = new Date();
    const commentDate = new Date(this.comment.comments.datePublication);
    const difference = now.getTime() - commentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

  likeComment(comment: any){
    if (comment.spoiler == false && comment.validate == true){
      this.commentService.likeComment(comment.id, comment.user).subscribe((resp) => {
        this.comment = resp;
        console.log(this.comment)
      })
    }

  }

  respondToComment(){

  }

  shareComment(){

  }

}
