import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MovieService} from "../../services/movie/movie.service";
import {ActivatedRoute} from "@angular/router";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {faBookmark, faStarHalfStroke, faChevronRight, faPlay, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../js/date-helper";
import {MovieSimilar} from "../../models/movie/movie-similar";
import {CarouselImageListComponent} from "../carousel-image-list/carousel-image-list.component";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  @ViewChild('similarMoviesRef') similarMoviesChild : CarouselImageListComponent | undefined;

  @Input() requestedMovieId: number = 0;

  faBookmark: IconDefinition = faBookmark;
  faStarHalfStroke: IconDefinition = faStarHalfStroke;
  faChevronRight: IconDefinition = faChevronRight;
  faPlay: IconDefinition = faPlay;
  viewedStatus: boolean = false;
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = "bottom";
  seenStatus: string = 'Not Seen';

  globalConstants = GlobalConstants;
  // @ts-ignore
  movie: MovieDetailsModel = {};
  watchProviders: [] = [];
  isWatchProvidersEmpty = false;
  // @ts-ignore
  similarMovies: MovieSimilar[] = [];

  userMovie = {
    bookmark: [],
    viewInfo: {
      checked: '',
    }
  }

  // @ts-ignore
  loading = {
    movie: true,
    actors: true,
    watchProviders: true,
    userViewInfo: true
  }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    await this.movieService.fetchMovieDetails(this.requestedMovieId,
      ['credits', 'videos', 'images']).subscribe(
      (resp) => {
        setTimeout(()=> {
          this.movie = resp;
          this.loading.movie = false;
        }, 100)
      }

    )

    await this.fetchWatchedInfos();

    // @ts-ignore
    await this.movieService.fetchWatchProviders(this.requestedMovieId).subscribe(
      (resp) => {
        this.watchProviders = resp.results;
        this.loading.watchProviders = false;
      }
    )

  }

  async fetchWatchedInfos(){
    // @ts-ignore
    await this.movieService.fetchMovieWatchedStatus(this.requestedMovieId).subscribe(
      (resp) => {
        this.userMovie.viewInfo.checked=resp.body ? 'checked' : '';
        this.viewedStatus = resp.body;
        this.seenStatus = resp.body ? 'Seen' : 'Not Seen';
        this.loading.userViewInfo = false;
      }
    )

  }
  getRateFormated(): number {
    // @ts-ignore
    return Math.round(this.movie.vote_average * 10) / 10;
  }

  getMovieYear(){
    // @ts-ignore
    return stringToDate(this.movie.release_date).getFullYear();
  }

  WatchProvidersEmpty($event: any){
    this.isWatchProvidersEmpty = $event;
  }

  getYoutubeTrailers() {
    return this.movie.videos.results.filter(
      x => x.type.toLowerCase() == 'trailer' &&
        x.site.toLowerCase() == 'youtube'
    );
  }

  getYoutubeTrailersLength() {
    return this.movie.videos.results.filter(
      x => x.type.toLowerCase() == 'trailer' &&
        x.site.toLowerCase() == 'youtube'
    ).length;
  }

  async handleChangeTabView(e: any) {

    //tab: trailers
    if (e.index === 0){
    }
    //tab: comments
    if (e.index === 1){
    }
    //tab: more like this
    if (e.index === 2){
      // @ts-ignore
      await this.movieService.fetchSimilarMovies(this.requestedMovieId).toPromise()
        .then((resp) => {
          this.similarMovies = resp.results;
          // @ts-ignore
          this.similarMoviesChild?.isLoading = false;
        })
    }
  }

async removeMovieFromViewInfo(){
 await this.movieService.removeMovieToWatchedList(
  // @ts-ignore
   this.requestedMovieId,this.movie.original_title
   ).subscribe(
    (resp) => {
      this.viewedDialogShown = false;
      this.fetchWatchedInfos();
    }
  )
}
async increaseWatchedNumber(){
  // @ts-ignore
  await this.movieService.increaseWatchedNumber(this.requestedMovieId).subscribe(
    (resp) => {
      this.viewedDialogShown = false;
      this.fetchWatchedInfos();
    }
  )
}
async showViewedDialog() {
    if(this.viewedStatus){
      this.viewedDialogShown = true;
    }else{
      await this.movieService.addMovieToWatchedList(
        // @ts-ignore
        this.requestedMovieId,this.movie.title
      ).subscribe(
        (resp) => {
            this.fetchWatchedInfos();
        }
      )
    }
  }
}
