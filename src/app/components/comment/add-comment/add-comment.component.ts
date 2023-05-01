import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieService} from "../../../services/movie/movie.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() requestedMovieId: number = 0;
  @Output() eventEmitter = new EventEmitter<any>();

  text: string = "";

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  postComment() {
    if (this.text.length > 0 && this.requestedMovieId != 0) {
      this.movieService.postComment(this.requestedMovieId, this.text).subscribe((resp) => {
        this.eventEmitter.emit();
      })
    }
  }

}
