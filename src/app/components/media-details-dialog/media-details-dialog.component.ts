import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-media-details-dialog',
  templateUrl: './media-details-dialog.component.html',
  styleUrls: ['./media-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaDetailsDialogComponent implements OnInit {

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';

  requestedMovieId: number = 0;
  requestedTvId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.viewedDialogShown = false
    this.requestedMovieId = 0;
    this.requestedTvId = 0;
  }

  open(media: any){
    if (media.original_name){
      this.requestedTvId = media.id;
    }else{
      this.requestedMovieId = media.id;
    }
    this.viewedDialogShown = true;
  }

}
