import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieService} from "../../../services/movie/movie.service";
import {MovieDetailsModel} from "../../../models/movie/movie-details-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() elementId: number = 0;
  @Input() elementType: string = "movie";
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() elementName: string = "";
  text: string = "";

  // @ts-ignore
  movie: MovieDetailsModel = {};

  constructor(private movieService: MovieService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async postComment() {

    // @ts-ignore
    await this.movieService.fetchMovieDetails(this.requestedMovieId,
      ['credits', 'videos', 'images']).subscribe(
      (resp) => {
        // @ts-ignore
        resp = JSON.parse(resp.data);
        setTimeout(()=> {
          this.movie = resp;
          if(this.text.length == 0){
            this.addSingleToast('warn', 'Warning', 'Please enter a comment');
            return;
          }
          if (this.text.length > 0 && this.elementId != 0) {
            console.log(this.movie)
            this.movieService.postComment(this.elementId, this.text, this.elementName,this.elementType).subscribe((resp) => {
              this.eventEmitter.emit();
            })
          }
        }, 100)
      }
    )
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
