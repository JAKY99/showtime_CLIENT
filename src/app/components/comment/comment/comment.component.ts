import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommentService} from "../../../services/comment/comment.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AddCommentDialogComponent} from "../add-comment-dialog/add-comment-dialog.component";
import {ResponseCommentComponent} from "../response-comment/response-comment.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {

  @ViewChild('responseCommentDialogChild') responseCommentDialogChild : ResponseCommentComponent | undefined;
  @Input() comment: any = {};
  @Input() showOrigin: boolean = false;

  constructor(private commentService: CommentService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.comment)
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
    this.responseCommentDialogChild?.open(this.comment.comments.id);
  }

  reportComment(event: Event){
    this.confirmationService.confirm({
      header: "Reporting",
      message: 'Are you sure that you want to report this comment?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.reportComment(this.comment.comments.id).subscribe((resp) => {
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Comment reported successfully'});
              this.comment.comments.validate = false;
              this.commentService.postCommentEvent.emit();
        })
      },
      reject: () => {
        //reject action
      },
    });
  }

  fetchResponseComments(commentId: number){
    if (commentId == this.comment.comments.id) {
      this.commentService.fetchResponse(commentId).subscribe((resp) => {
        this.comment.comments.responseComments = resp;
      });
    }
  }
}
