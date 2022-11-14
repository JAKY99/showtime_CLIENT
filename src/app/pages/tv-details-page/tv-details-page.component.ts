import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {ActivatedRoute} from "@angular/router";
import {TvDetails} from "../../models/tv/tv-details";
import {GlobalConstants} from "../../common/constants/global-constants";
import {faBookmark, faStarHalfStroke, faChevronRight, faPlay} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../js/date-helper";
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";

@Component({
  selector: 'app-tv-details-page',
  templateUrl: './tv-details-page.component.html',
  styleUrls: ['./tv-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TvDetailsPageComponent implements OnInit {



  constructor( private tvService : TvService, private route : ActivatedRoute) { }

  faBookmark = faBookmark;
  faStarHalfStroke = faStarHalfStroke;
  faChevronRight = faChevronRight;
  faPlay = faPlay;
  watchProviders: [] = [];
  isWatchProvidersEmpty = false;


  globalConstants = GlobalConstants;
  // @ts-ignore
  tv:TvDetails = {};
  // @ts-ignore
  lastEpisode: TvEpisodeDetails = {} ;

  userTv = {
    bookmark: [],
    viewInfo: {
      checked: '',
    }
  }

  // @ts-ignore
  loading = {
    tv: true,
    actors: true,
    watchProviders: true,
  }

  async ngOnInit(): Promise <void> {
    // @ts-ignore
    await this.tvService.fetchTvDetails(+this.route.snapshot.paramMap.get('id'),
      ['credits']).subscribe(
      (resp) => {
        setTimeout(()=> {
          this.tv = resp;
          this.loading.tv = false;
        }, 100)
      }
    )

    // Changer le num de la série / episode display pour le faire correspondre
    // au dernier episode vu par le client
    // @ts-ignore
    await this.tvService.fetchTvBySeasonAndEpisode(+this.route.snapshot.paramMap.get('id'),
      1, 2).subscribe(
      (resp) => {
        // console.log(resp);
        setTimeout(() => {
          this.lastEpisode = resp;
        }, 100);
      }
    );

    // @ts-ignore
    await this.tvService.fetchWatchProviders(+this.route.snapshot.paramMap.get('id')).subscribe(
      (resp) => {
        this.watchProviders = resp.results;
        this.loading.watchProviders = false;
      }
    )
  }

  getRateFormated(): number {
    // @ts-ignore
    return Math.round(this.tv.vote_average * 10) / 10
  }

  getTvYear(){
    // @ts-ignore
    return stringToDate(this.tv.first_air_date).getFullYear();
  }

  WatchProvidersEmpty($event: any){
    this.isWatchProvidersEmpty = $event;
  }

  async handleChangeTabView(e: any) {
    //tab: trailers
    if (e.index === 0){

    }
    //tab: comments
    if (e.index === 1){
      // fetch async sur les episodes
    }
  }
}
