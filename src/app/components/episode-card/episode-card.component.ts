import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {formatDate} from "@angular/common";
import {TvService} from "../../services/tv/tv.service";

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EpisodeCardComponent implements OnInit {

  constructor(private tvService : TvService) { }

  // @ts-ignore
  _item: TvEpisodeDetails;
  get item(): TvEpisodeDetails {
    return this._item;
  }
  @Input() set item(value: TvEpisodeDetails) {
    this._item = value;
    this.episodeStatus();
  }

  // @ts-ignore
  @Input() seasonId : number | null;
  // @ts-ignore
  @Input() tvId : number;
  @Output() resultsSeasonEmitterEvent = new EventEmitter<any>();
  @Output() resultsSerieEmitterEvent = new EventEmitter<any>();

  imageState: string = "setup";
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  isLoadingStatus: boolean = false;

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

  episodeStatus() {
    if(this._item.id) {
      this.tvService.fetchTvEpisodeWatchedStatus(
        this._item.id
      ).subscribe(
        (resp) => {
          if (resp === true) {
            this._item.status = 'SEEN';
          }
        })
    }
  }

  async updateEpisodeStatus() {
    this.isLoadingStatus = true;
    await this.tvService.addEpisodeToWatchedList(
      this.tvId,
      this.seasonId,
      this.item.id
    ).subscribe(
      (resp) => {
        if(resp === true){
          this._item.status = 'SEEN';
          this.resultsSeasonEmitterEvent.emit(this.seasonId);
          this.resultsSerieEmitterEvent.emit(this.tvId);
        }
        this.isLoadingStatus = false;
      }
    )
  }

}
