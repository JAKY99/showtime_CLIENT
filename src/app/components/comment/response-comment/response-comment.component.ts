import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {AddCommentDialogComponent} from "../add-comment-dialog/add-comment-dialog.component";
import {CommentService} from "../../../services/comment/comment.service";
import {Observable} from "rxjs";
import {MovieDetailComponent} from "../../movie-details/movie-detail.component";

@Component({
  selector: 'app-response-comment',
  templateUrl: './response-comment.component.html',
  styleUrls: ['./response-comment.component.scss']
})
export class ResponseCommentComponent implements OnInit {

  @ViewChild('responseCommentComponent') responseCommentComponent : ResponseCommentComponent | undefined;
  @Output() eventEmitter = new EventEmitter<any>();

  @Input() comment: {} = {};

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  requestedMovieId: number = 0;
  commentId: number = 0;
  resultResponseComments: [] = [];
  text: string = "";
  constructor(private commentService: CommentService, private movieDetailComponent: MovieDetailComponent) { }

  ngOnInit(): void {
  }

  close(){
    this.viewedDialogShown = false
    this.movieDetailComponent.fetchComments();
  }

  emitFetch(){
    this.eventEmitter.emit();
  }

  open(commentId: number){
    this.viewedDialogShown = true
    this.commentId = commentId
    this.fetchResponseComments();
  }

  fetchResponseComments(){
      this.commentService.fetchResponse(this.commentId).subscribe((resp) => {
        this.resultResponseComments = resp;

      }, (error) => {
        console.log(error);
      });

  }

  postComment() {
  this.commentService.postResponseComment(this.commentId, this.text).subscribe((resp) => {
    if (resp == true){
      this.emitFetch();
      this.text = "";
      this.fetchResponseComments();
    }
  })
  }
}
