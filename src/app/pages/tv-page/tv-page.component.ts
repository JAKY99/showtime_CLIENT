import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvDetails} from "../../models/tv/tv-details";
import {ActivatedRoute} from "@angular/router";
import {TvGenres} from "../../models/tv/tv-genres";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TvPageComponent implements OnInit {

  @ViewChild('topRatedTvRef') topRatedTvChild: CarouselImageListComponent | undefined;
  @ViewChild('airingTodayTvRef') airingTodayTvChild: CarouselImageListComponent | undefined;
  @ViewChild('watching') watching: CarouselImageListComponent | undefined;
  @ViewChild('watched') watched: CarouselImageListComponent | undefined;
  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;

  // @ts-ignore
  topRatedTv: TvDetails = {};
  // @ts-ignore
  tvGenres: TvGenres = {};
  trendingTv: TvDetails[] = [];
  airingTodayTv: TvDetails[] = [];
  tvWatching: TvDetails[] = [];
  tvWatched: TvDetails[] = [];
  constructor(
    private tvService: TvService,
    private route: ActivatedRoute
  ) {
  }

  loading = {
    tv: true,
    topRatedTv: true,
    trendingTv: true,
    airingTodayTv: true,
    tvWatching: true,
    genres: true
  }

  async ngOnInit(): Promise<void> {

    this.tvService.fetchTvTopRated().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.topRatedTv = resp.results[0];
        // @ts-ignore
        // this.popularTvChild?.isLoading = false;
        this.loading.topRatedTv = false;
      })

    this.tvService.fetchTvTopRated().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.trendingTv = resp.results;
        // @ts-ignore
        this.topRatedTvChild?.isLoading = false;
      })

    this.tvService.fetchTvWatching().toPromise()
      .then(resp => {
        resp.forEach((item: any) => {
          this.tvService.fetchTvDetailsRaw(item).toPromise().then(
            respDetails => {
              respDetails = JSON.parse(respDetails.data);
              this.tvWatching.push(respDetails);
          })
        })
        // @ts-ignore
        this.watching?.isLoading = false;
      })

    this.tvService.fetchTvWatched().toPromise()
      .then(resp => {
        resp.forEach((item: any) => {
          this.tvService.fetchTvDetailsRaw(item).toPromise().then(
            respDetails => {
              respDetails = JSON.parse(respDetails.data);
              this.tvWatched.push(respDetails);
            })
        })
        // @ts-ignore
        this.watched?.isLoading = false;
      })

    this.tvService.fetchAiringToday().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.airingTodayTv = resp.results;
        // @ts-ignore
        this.airingTodayTvChild?.isLoading = false;
      })

    await this.tvService.fetchAllTvGenres().subscribe(
      (resp) => {
        resp = JSON.parse(resp.data);
        // console.log(resp)
        setTimeout(() => {
          this.tvGenres = resp;
          this.loading.genres = false;
        }, 100)
      }
    )
  }

  scrollTo(elementId : string): void {
    let element = document.getElementById(elementId);
    element?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    // this.viewportScroller.scrollToAnchor(elementId);
  }


  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }
}
