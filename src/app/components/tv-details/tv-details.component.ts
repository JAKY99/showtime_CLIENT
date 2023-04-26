import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {ActivatedRoute} from "@angular/router";
import {TvDetails} from "../../models/tv/tv-details";
import {GlobalConstants} from "../../common/constants/global-constants";
import {faBookmark, faStarHalfStroke, faChevronRight, faPlay} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../js/date-helper";
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {CarouselImageListComponent} from "../carousel-image-list/carousel-image-list.component";
import {TvSimilar} from "../../models/tv/tv-similar";

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TvDetailsComponent implements OnInit {

  constructor( private tvService : TvService, private route : ActivatedRoute) { }

  @ViewChild('similarTvRef') similarTvChild : CarouselImageListComponent | undefined;

  @Input() requestedTvId: number = 0;

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

  // @ts-ignore
  similarTv: TvSimilar[] = [];

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
    await this.tvService.fetchTvDetails(this.requestedTvId,
      ['credits']).subscribe(
      (resp) => {
        //@ts-ignore
        resp = JSON.parse(resp.data);
        setTimeout(()=> {
          this.tv = resp;
          this.loading.tv = false;
        }, 100)
      }
    )

    // Changer le num de la série / episode display pour le faire correspondre
    // au dernier episode vu par le client
    // @ts-ignore
    await this.tvService.fetchTvBySeasonAndEpisode(this.requestedTvId,
      1, 2).subscribe(
      (resp) => {
        resp = JSON.parse(resp.data);
        setTimeout(() => {
          this.lastEpisode = resp;
        }, 100);
      }
    );

    // @ts-ignore
    await this.tvService.fetchWatchProviders(this.requestedTvId).subscribe(
      (resp) => {
        resp = JSON.parse(resp.data);
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
  async handleChangeTabView2(e: any) {
    //tab: Comments
    if (e.index === 0){

    }
    //tab: Similars
    if (e.index === 1){
      // @ts-ignore
      await this.tvService.fetchSimilarTv(this.requestedTvId).toPromise()
        .then((resp) => {
          resp = JSON.parse(resp.data);
          this.similarTv = resp.results;
        });
      // @ts-ignore
      if (this.similarTvChild){
        this.similarTvChild.isLoading = false;
      }
    }
  }

  handleTvChange($event: any){
    this.loading = {
      tv: true,
      actors: true,
      watchProviders: true,
    }
    this.requestedTvId = $event.id
    this.ngOnInit()
  }
}
