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
  @Input() seasonId : number ;
  // @ts-ignore
  @Input() tvId : number;
  @Input() seasonNumber : number = 0;
  @Input() episodeNumber : number = 0;
  @Output() resultsSeasonEmitterEvent = new EventEmitter<any>();
  @Output() resultsSerieEmitterEvent = new EventEmitter<any>();
  @Output() resultEpisodeUpdateEventEmitter = new EventEmitter<any>();
  viewedAddDialogShown: boolean = false;
  viewedAddDialogPosition: string = "bottom";

  imageState: string = "setup";
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  isLoadingStatus: boolean = false;

  ngOnInit(): void {
    this.tvService.addSerieToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.removeSerieToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    // @ts-ignore
    return this.todayDate;
  }

  ngOnChanges() {
    this.tvService.addSerieToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.removeSerieToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.addSeasonToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.removeSeasonToWatchlist.subscribe((state) => {

      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
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
      this.item.id,
      this.seasonNumber,
      this.episodeNumber
    ).subscribe(
      (resp) => {
        if(resp === true){
          this._item.status = 'SEEN';
          this.resultEpisodeUpdateEventEmitter.emit({item: this._item});
        }
        this.isLoadingStatus = false;
      }
    )
  }

  async increaseWatchedNumber() {
    this.viewedAddDialogShown = false;
    this.updateEpisodeStatus()
  }

  async removeFromViewInfo() {
    this.viewedAddDialogShown = false;
    this.isLoadingStatus = true;
    await this.tvService.removeEpisodeFromViewInfo(
      this.tvId,
      this.seasonId,
      this.item.id,
      this.seasonNumber,
      this.episodeNumber
    ).subscribe(
      (resp) => {
        if(resp === true){
          this._item.status = '';
          this.resultEpisodeUpdateEventEmitter.emit({item: this._item});
        }
        this.isLoadingStatus = false;
      },
      (error) => {
        this.isLoadingStatus = false;
      }
    )
  }

  updateEpisodeStatusDialog() {
    if (this._item.status !== 'SEEN') {
      this.updateEpisodeStatus();
    }
    if(this._item.status === 'SEEN') {
      this.viewedAddDialogShown = true;
    }
  }
}
