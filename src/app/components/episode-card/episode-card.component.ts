import {Component, Input, OnInit,ViewEncapsulation} from '@angular/core';
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EpisodeCardComponent implements OnInit {

  constructor() {
  }
  // @ts-ignore
  @Input() item : TvEpisodeDetails ;

  imageState: string = "setup";
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  ngOnInit(): void {

    // @ts-ignore
    return this.todayDate;
  }

  imageStateChange($event: string) {
    this.imageState = $event;
  }

  isImageLoaded(){
    return this.imageState === 'finally';
  }

}
