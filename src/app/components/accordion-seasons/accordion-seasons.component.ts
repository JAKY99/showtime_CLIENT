import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";
import {forkJoin} from "rxjs";
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {tryCatch} from "rxjs/internal-compatibility";

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
  @Output() firstLoadingDone = new EventEmitter<any>();

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

      this.tvService.triggerAddSeasonToWatchlist(state)
      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.removeSerieToWatchlist.subscribe((state) => {

      this.tvService.triggerRemoveSeasonoWatchlist(state)
      if(state=="start"){
        this.isLoadingStatus = true;
      }
      if(state=="end"){
        this.isLoadingStatus = false;
      }
    })
    this.tvService.addEpisodeToWatchlist.subscribe((state) => {
      this.refreshAccordionEpisodeData(state)
    });
    this.tvService.removeEpisodeToWatchlist.subscribe((state) => {
      this.refreshAccordionEpisodeData(state)
    });
    this.fetchAccordionData();
  }
  async fetchAccordionData() {
    this.allSeasons = [];
    let self = this
    for (let i = 0; i < this.nbSeasons + 1; i++) {
      await new Promise( async function (resolve, reject) {
        try{
          const resp =  await self.tvService.fetchTvBySeason(self.tvId, i).toPromise();
          // @ts-ignore
          const parsedResp = JSON.parse(resp.data);

          const forkJoinObservable = forkJoin({
            nbEpisodes: self.tvService.fetchNbEpisodesWatchedInSerie(self.tvId, parsedResp.id).toPromise(),
            status: self.tvService.fetchTvSeasonWatchedStatus(self.tvId, parsedResp.id).toPromise(),
            details: self.tvService.fetchTvBySeason(self.tvId, parsedResp.season_number).toPromise()
          });

          forkJoinObservable.subscribe((respFork) => {
            let tvSeasonDetails:TvSeasonDetails;
            // @ts-ignore
            tvSeasonDetails = JSON.parse(respFork.details.data);
            // @ts-ignore
            tvSeasonDetails.nbEpisodesWatched = respFork.nbEpisodes;
            // @ts-ignore
            tvSeasonDetails.watchedStatus = respFork.status;
            self.allSeasons[i] = tvSeasonDetails;

            self.allSeasons.sort((a: { season_number: number; }, b: { season_number: number; }) => a.season_number - b.season_number);
            if(i === self.nbSeasons){
              self.loading.seasons = false;
              self.firstLoadingDone.emit(true);
              resolve(true)
            }
            resolve(true)
          });
        }catch (e) {
          self.firstLoadingDone.emit(true);
          console.log(e)
          reject(e)
        }
    });
    }
  }
  async refreshAccordionData($event: any) {
    let self = this
    for (let i = 0; i < this.nbSeasons + 1; i++) {
      await new Promise( async function (resolve, reject) {
        try{
          const resp =  await self.tvService.fetchTvBySeason(self.tvId, i).toPromise();
          // @ts-ignore
          const parsedResp = JSON.parse(resp.data);

          const forkJoinObservable = forkJoin({
            nbEpisodes: self.tvService.fetchNbEpisodesWatchedInSerie(self.tvId, parsedResp.id).toPromise(),
            status: self.tvService.fetchTvSeasonWatchedStatus(self.tvId, parsedResp.id).toPromise(),
            details: self.tvService.fetchTvBySeason(self.tvId, parsedResp.season_number).toPromise()
          });

          forkJoinObservable.subscribe((respFork) => {
            let tvSeasonDetails:TvSeasonDetails;
            // @ts-ignore
            tvSeasonDetails = JSON.parse(respFork.details.data);
            // @ts-ignore
            self.allSeasons[i].nbEpisodesWatched = respFork.nbEpisodes;
            // @ts-ignore
            self.allSeasons[i].watchedStatus = respFork.status;
            resolve(true)
          });
        }catch (e) {
          self.firstLoadingDone.emit(true);
          console.log(e)
          reject(e)
        }
      });
    }
  }

  async updateSeasonStatus( seasonId: number,seasonNumber: number){
    this.isLoadingStatus = true;
    this.tvService.triggerAddSeasonToWatchlist("start")
    let self = this;
    if(this.viewedStatus){
      this.viewedDialogShown = true;
    }else{

      await this.tvService.addSeasonToWatchedList(
        this.tvId,
        seasonId
      ).subscribe(
        async (respFork) => {
          await new Promise( async function (resolve, reject) {
            try{
              const resp =  await self.tvService.fetchTvBySeason(self.tvId, seasonNumber).toPromise();
              // @ts-ignore
              const parsedResp = JSON.parse(resp.data);

              const forkJoinObservable = forkJoin({
                nbEpisodes: self.tvService.fetchNbEpisodesWatchedInSerie(self.tvId, parsedResp.id).toPromise(),
                status: self.tvService.fetchTvSeasonWatchedStatus(self.tvId, parsedResp.id).toPromise(),
                details: self.tvService.fetchTvBySeason(self.tvId, parsedResp.season_number).toPromise()
              });

              forkJoinObservable.subscribe((respFork) => {
                let tvSeasonDetails:TvSeasonDetails;
                // @ts-ignore
                tvSeasonDetails = JSON.parse(respFork.details.data);
                // @ts-ignore
                tvSeasonDetails.nbEpisodesWatched = respFork.nbEpisodes;
                // @ts-ignore
                tvSeasonDetails.watchedStatus = respFork.status;
                self.allSeasons[seasonNumber] = tvSeasonDetails;
                self.tvService.triggerAddSeasonToWatchlist("end")
                self.resultsSerieEmitterEventv2.emit(self.tvId);
                self.isLoadingStatus = false;
                resolve(true)
              });
            }catch (e) {
              self.firstLoadingDone.emit(true);
              console.log(e)
              reject(e)
            }
          });

        }
      )
    }
  }

  async refreshAccordionEpisodeData($event: any) {
    console.log($event)
    let self = this
    let i = $event.item.season_number;
    let j = $event.item.episode_number;
    await new Promise( async function (resolve, reject) {
      try{
        const resp =  await self.tvService.fetchTvBySeason(self.tvId, i).toPromise();
        // @ts-ignore
        const parsedResp = JSON.parse(resp.data);

        const forkJoinObservable = forkJoin({
          nbEpisodes: self.tvService.fetchNbEpisodesWatchedInSerie(self.tvId, parsedResp.id).toPromise(),
          status: self.tvService.fetchTvSeasonWatchedStatus(self.tvId, parsedResp.id).toPromise(),
          details: self.tvService.fetchTvBySeason(self.tvId, parsedResp.season_number).toPromise()
        });

        forkJoinObservable.subscribe((respFork) => {
          let tvSeasonDetails:TvSeasonDetails;
          // @ts-ignore
          tvSeasonDetails = JSON.parse(respFork.details.data);
          // @ts-ignore
          self.allSeasons[i].nbEpisodesWatched = respFork.nbEpisodes;
          // @ts-ignore
          self.allSeasons[i].watchedStatus = respFork.status;
          resolve(true)
        });
      }catch (e) {
        self.firstLoadingDone.emit(true);
        console.log(e)
        reject(e)
      }
    });
  }
  async updateSpecificEpisodeStatus($event: any) {

    // await this.refreshAccordionData($event);


  }

  updateEpisodeInfosFromChild($event: any) {
    // this.refreshAccordionData($event);
    // this.resultEpisodeUpdateEventEmitter.emit($event);
  }

  async increaseWatchedNumber() {
    await this.reAddSeason(this.seasonIdSelected, this.seasonNumber)

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
      this.updateSeasonStatus(seasonId,seasonNumber);
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
  async reAddSeason( seasonId: number,seasonNumber: number){
    this.viewedAddDialogShown = false;
    this.isLoadingStatus = true;
    this.tvService.triggerAddSeasonToWatchlist("start")
    let self = this;
    if(this.viewedStatus){
      this.viewedDialogShown = true;
    }else{

      await this.tvService.reAddSeasonToWatchedList(
        this.tvId,
        seasonId
      ).subscribe(
        async (respFork) => {
          await new Promise( async function (resolve, reject) {
            try{
              const resp =  await self.tvService.fetchTvBySeason(self.tvId, seasonNumber).toPromise();
              // @ts-ignore
              const parsedResp = JSON.parse(resp.data);

              const forkJoinObservable = forkJoin({
                nbEpisodes: self.tvService.fetchNbEpisodesWatchedInSerie(self.tvId, parsedResp.id).toPromise(),
                status: self.tvService.fetchTvSeasonWatchedStatus(self.tvId, parsedResp.id).toPromise(),
                details: self.tvService.fetchTvBySeason(self.tvId, parsedResp.season_number).toPromise()
              });

              forkJoinObservable.subscribe((respFork) => {
                let tvSeasonDetails:TvSeasonDetails;
                // @ts-ignore
                tvSeasonDetails = JSON.parse(respFork.details.data);
                // @ts-ignore
                tvSeasonDetails.nbEpisodesWatched = respFork.nbEpisodes;
                // @ts-ignore
                tvSeasonDetails.watchedStatus = respFork.status;
                self.allSeasons[seasonNumber] = tvSeasonDetails;
                self.tvService.triggerAddSeasonToWatchlist("end")
                self.resultsSerieEmitterEventv2.emit(self.tvId);
                self.isLoadingStatus = false;
                resolve(true)
              });
            }catch (e) {
              self.firstLoadingDone.emit(true);
              console.log(e)
              reject(e)
            }
          });

        }
      )
    }
  }
}
