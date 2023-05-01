import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCommentDialogComponent implements OnInit {

  @ViewChild('addCommentRef') addCommentChild: RecommendedMediaComponent | undefined;
  @Output() eventEmitter = new EventEmitter<any>();

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  requestedMovieId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.viewedDialogShown = false
  }

  emitFetch(){
    this.eventEmitter.emit();
  }

  open(requestedMovieId: number){
    this.viewedDialogShown = true
    this.requestedMovieId = requestedMovieId;
  }

}
