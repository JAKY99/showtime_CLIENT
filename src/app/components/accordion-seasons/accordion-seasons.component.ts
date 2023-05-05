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
    this.updateSeasonStatusEvent();
  }

  @Output() resultsSerieEmitterEventv2 = new EventEmitter<any>();
  // @Output() newSeasonIncEvent = new EventEmitter<any>();


  viewedStatus: boolean = false;
  viewedDialogShown: boolean = false;


  // @ts-ignore
  tvSeasonDetails:TvSeasonDetails = {};
  allSeasons: TvSeasonDetails[] = [];
  statusSeason = {
    checked : '',
  };

  // @ts-ignore
  loading = {
    seasons: true,
  }


  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  async ngOnInit(): Promise <void> {

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
              this.allSeasons.push(this.tvSeasonDetails);
            })

        }
      )
    }
    this.allSeasons.sort((a, b) => (a.season_number - b.season_number));
  }

  async updateSeasonStatus( seasonId: number){
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
          this.resultsSerieEmitterEventv2.emit(this.tvId);
        }
      )
    }
  }

  updateSeasonInfosFromChild(imdbIdSeason : number) {
    this.allSeasons.map((season) => {
      if(season.id === imdbIdSeason ){
        if(season.nbEpisodesWatched < season.episodes.length){
          season.nbEpisodesWatched = season.nbEpisodesWatched + 1;
        }
        if(season.watchedStatus == "NOTSEEN"){
          season.watchedStatus = "WATCHING";
        }
        if(season.nbEpisodesWatched == season.episodes.length){
          season.watchedStatus = "SEEN";
        }
      }
    })
  }

  updateSerieInfosFromChild($event: any) {
    this.resultsSerieEmitterEventv2.emit($event);
  }

  updateSeasonStatusEvent() {
    if (this.item === "SEEN") {
      this.allSeasons.map((season) => {
        //Je peux pas faire comme ça prc les éléments sont déjà chargé donc il faut les update, pas juste les réaffecter
          season.watchedStatus = "SEEN";
          season.episodes.map((episode) => {
            episode.status = "SEEN";
          })
        }
      )

    }
  }

  updateSpecificEpisodeStatus(episode: TvEpisodeDetails){
    const season: TvSeasonDetails | undefined = this.allSeasons.find(x => x.season_number === episode.season_number);
    if (season) {
      season.episodes.map(x => {
        if (x.episode_number === episode.episode_number) {
          x.status = "SEEN";
        }
      });
      this.updateSeasonInfosFromChild(season.id)
    }
  }

}
