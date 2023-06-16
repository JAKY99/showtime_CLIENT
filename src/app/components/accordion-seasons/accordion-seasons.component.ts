import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";
import {forkJoin} from "rxjs";
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";

@Component({
  selector: 'app-accordion-seasons',
  templateUrl: './accordion-seasons.component.html',
  styleUrls: ['./accordion-seasons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionSeasonsComponent implements OnInit {
  private tvIdSelected: number = 0;
  private seasonIdSelected: number = 0;
  private seasonNumber: number = 0;
  constructor(private tvService : TvService) { }

  // @ts-ignore
  @Input() nbSeasons : number;
  // @ts-ignore
  @Input() tvId : number;

  // @ts-ignore
  _item: string;
  get item(): string {
    return this._item;
  }
  @Input() set item(value: string) {
    this._item = value;
  }

  @Output() resultsSerieEmitterEventv2 = new EventEmitter<any>();
  @Output() resultEpisodeUpdateEventEmitter = new EventEmitter<any>();


  viewedStatus: boolean = false;
  viewedDialogShown: boolean = false;
  isLoadingStatus: boolean = false;
  viewedAddDialogShown: boolean = false;
  viewedAddDialogPosition: string = "bottom";


  // @ts-ignore
  tvSeasonDetails:TvSeasonDetails = {};
  allSeasons: TvSeasonDetails[] = [];

  // @ts-ignore
  loading = {
    seasons: true,
  }


  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');


  ngOnInit(){
    this.tvService.addSerieToWatchlist.subscribe((state) => {
      console.log("state",state)
      this.tvService.triggerAddSeasonToWatchlist(state)
      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.removeSerieToWatchlist.subscribe((state) => {
      console.log("state",state)
      this.tvService.triggerRemoveSeasonoWatchlist(state)
      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.fetchAccordionData();
  }
  async fetchAccordionData(){
    this.allSeasons = [];
    // pour amélio => call la série > choper le nb de saisons & ses ids pour économ le 1er fetchTvBySeason
    for (let i = 0; i < this.nbSeasons+1; i++) {
      // @ts-ignore
      await this.tvService.fetchTvBySeason(this.tvId,i).subscribe(
        (resp) => {
          resp = JSON.parse(resp.data);
          // oui je fait 2 fois un fetchTvBySeason , le 1er juste pour récup l'id et faire les autres query
          // si je query pas une 2e fois j'ai tous mes résultats qui arrivent en border

          forkJoin({
            nbEpisodes : this.tvService.fetchNbEpisodesWatchedInSerie(
              this.tvId,
              resp.id
            ),
            status : this.tvService.fetchTvSeasonWatchedStatus(
              this.tvId,
              resp.id
            ),
            details : this.tvService.fetchTvBySeason(
              this.tvId,
              resp.season_number
            )
          }).subscribe(
            (respFork) => {
              this.tvSeasonDetails = JSON.parse(respFork.details.data);
              console.log(this.tvSeasonDetails)
              this.tvSeasonDetails.nbEpisodesWatched = respFork.nbEpisodes;
              this.tvSeasonDetails.watchedStatus = respFork.status
              this.allSeasons[this.tvSeasonDetails.season_number] = this.tvSeasonDetails;
            })

        }
      )
    }
    this.allSeasons.sort((a, b) => (a.season_number - b.season_number));
  }
  async refreshAccordionData($event: any){
    // pour amélio => call la série > choper le nb de saisons & ses ids pour économ le 1er fetchTvBySeason
    for (let i = 0; i < this.nbSeasons+1; i++) {
      // @ts-ignore
      await this.tvService.fetchTvBySeason(this.tvId,i).subscribe(
        (resp) => {
          resp = JSON.parse(resp.data);
          // oui je fait 2 fois un fetchTvBySeason , le 1er juste pour récup l'id et faire les autres query
          // si je query pas une 2e fois j'ai tous mes résultats qui arrivent en border

          forkJoin({
            nbEpisodes : this.tvService.fetchNbEpisodesWatchedInSerie(
              this.tvId,
              resp.id
            ),
            status : this.tvService.fetchTvSeasonWatchedStatus(
              this.tvId,
              resp.id
            ),
            details : this.tvService.fetchTvBySeason(
              this.tvId,
              resp.season_number
            )
          }).subscribe(
            (respFork) => {

              this.tvSeasonDetails = JSON.parse(respFork.details.data);
              this.tvSeasonDetails.nbEpisodesWatched = respFork.nbEpisodes;
              this.tvSeasonDetails.watchedStatus = respFork.status

              this.allSeasons.map((season) => {
                if(season.id === this.tvSeasonDetails.id){
                  season.nbEpisodesWatched = respFork.nbEpisodes;
                  season.watchedStatus = respFork.status
                  season.episodes?.map((episode) => {
                    if(episode.episode_number === $event.item.episode_number){
                      episode.status = $event.item.status;
                    }
                  })
                }
                return season;
              })
            })

        }
      )
    }
    this.allSeasons.sort((a, b) => (a.season_number - b.season_number));
  }
  async updateSeasonStatus( seasonId: number){
    this.isLoadingStatus = true;
    this.tvService.triggerAddSeasonToWatchlist("start")
    if(this.viewedStatus){
      this.viewedDialogShown = true;
    }else{

      await this.tvService.addSeasonToWatchedList(
        this.tvId,
        seasonId
      ).subscribe(
        (resp) => {
          this.allSeasons.map((season) => {
            if(season.id === seasonId){
              season.watchedStatus = resp;
              season.nbEpisodesWatched = season.episodes.length;
              season.episodes.map((episode) => {
                episode.status = "SEEN";
              })
            }

          })
          this.tvService.triggerAddSeasonToWatchlist("end")
          this.resultsSerieEmitterEventv2.emit(this.tvId);
          this.isLoadingStatus = false;

        }
      )
    }
  }

  async updateSpecificEpisodeStatus($event: any) {
    console.log($event)
    await this.refreshAccordionData($event);


  }

  updateEpisodeInfosFromChild($event: any) {
    this.refreshAccordionData($event);
    this.resultEpisodeUpdateEventEmitter.emit($event);
  }

  increaseWatchedNumber() {
    this.viewedAddDialogShown = false;
  }

  async removeFromViewInfo() {
    this.viewedAddDialogShown = false;
    this.isLoadingStatus = true;
    this.tvService.triggerRemoveSeasonoWatchlist("start")
    await this.tvService.removeSeasonFromViewInfo(
      this.tvIdSelected,
      this.seasonIdSelected,
      this.seasonNumber,
    ).toPromise()
      .then(
      (resp) => {

        this.refreshAccordionData({})
        this.allSeasons.map((season) => {
          if(season.id === this.seasonIdSelected){
            season.watchedStatus = resp;
            season.nbEpisodesWatched = season.episodes.length;
            season.episodes.map((episode) => {
              episode.status = "";
            })
          }
        })
        this.tvService.triggerRemoveSeasonoWatchlist("end")
        this.resultsSerieEmitterEventv2.emit(this.tvId);
        this.isLoadingStatus = false;

      }
    ).catch((error) => {
          console.log(error)
          this.isLoadingStatus = false;
        }
      )

  }
  updateSeasonStatusDialog(seasonId: number, status: string,seasonNumber: number) {
    this.tvIdSelected = this.tvId
    this.seasonIdSelected = seasonId
    this.seasonNumber = seasonNumber
    if(status=="SEEN"){
      this.viewedAddDialogShown = true;
    }
    if(status!=="SEEN"){
      this.updateSeasonStatus(seasonId);
    }
  }

  toggleLoading(){
    this.isLoadingStatus = !this.isLoadingStatus;
  }
  handleOpenAccordeon(){
    if(this.isLoadingStatus){
      this.tvService.triggerAddSeasonToWatchlist("start")
    }
    if(!this.isLoadingStatus){
      this.tvService.triggerAddSeasonToWatchlist("end")
    }
  }
}
