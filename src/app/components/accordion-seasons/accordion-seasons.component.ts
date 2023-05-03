import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";
import {forkJoin} from "rxjs";

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

  // episodesSeen: number = 0;
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
    for (let i = 0; i < this.nbSeasons; i++) {
      //to prevent i = 0 && seach season 0
      // @ts-ignore
      await this.tvService.fetchTvBySeason(this.tvId,i+1).subscribe(
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
    this.allSeasons = this.allSeasons.sort(function (a, b) {
      return a.season_number - b.season_number;
    });
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
          console.log(resp)
          this.allSeasons.map((season) => {
            if(season.id === seasonId){
              season.watchedStatus = resp;
              season.nbEpisodesWatched = season.episodes.length;
            }
          })
          // this.tvSeasonDetails.watchedStatus = res
          // this.fetchWatchedSeasonInfos();
        }
      )
    }
  }

}
