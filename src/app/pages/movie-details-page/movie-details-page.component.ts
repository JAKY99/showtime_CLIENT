import {Component, EventEmitter, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MovieService} from "../../services/movie/movie.service";
import {ActivatedRoute} from "@angular/router";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {faBookmark, faStarHalfStroke, faChevronRight, faPlay} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../js/date-helper";
import {MovieSimilar} from "../../models/movie/movie-similar";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailsPageComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  @ViewChild('similarMoviesRef') similarMoviesChild : CarouselImageListComponent | undefined;

  faBookmark = faBookmark;
  faStarHalfStroke = faStarHalfStroke;
  faChevronRight = faChevronRight;
  faPlay = faPlay;

  globalConstants = GlobalConstants;
  // @ts-ignore
  movie: MovieDetailsModel = {};
  watchProviders: [] = [];
  isWatchProvidersEmpty = false;
  // @ts-ignore
  similarMovies: MovieSimilar[] = [];

  userMovie = {
    bookmark: []
  }

  // @ts-ignore
  loading = {
    movie: true,
    actors: true,
    watchProviders: true
  }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    await this.movieService.fetchMovieDetails(+this.route.snapshot.paramMap.get('id'),
      ['credits', 'videos', 'images']).subscribe(
      (resp) => {
        setTimeout(()=> {
          this.movie = resp;
          this.loading.movie = false;
        }, 100)
      }
    )

    // @ts-ignore
    await this.movieService.fetchWatchProviders(+this.route.snapshot.paramMap.get('id')).subscribe(
      (resp) => {
        this.watchProviders = resp.results;
        this.loading.watchProviders = false;
      }
    )
    
  }
 
  getRateFormated(): number {
    // @ts-ignore
    return Math.round(this.movie.vote_average * 10) / 10
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
      await this.movieService.fetchSimilarMovies(+this.route.snapshot.paramMap.get('id')).toPromise()
        .then((resp) => {
          this.similarMovies = resp.results;
        });
      // @ts-ignore
      this.similarMoviesChild?.isLoading = false;
    }
  }

  async generateViewModal(e: any) {
    
  }
  ViewedStatus='Viewed';
  displayModal=false;

  displayBasic=false;

  displayBasic2=false;

  displayMaximizable=false;

  displayPosition=false;

  position="";
  showModalDialog() {
    this.displayModal = true;
}

showBasicDialog() {
    this.displayBasic = true;
}

showBasicDialog2() {
    this.displayBasic2 = true;
}

showMaximizableDialog() {
    this.displayMaximizable = true;
}

showPositionDialog(e:any,position: string) {
    console.log(e.target.className=="fa-solid fa-circle-check watched-status-check st-icon");
    if(e.target.className!=="fa-solid fa-circle-check watched-status-check st-icon"){
      this.ViewedStatus='Reviewed';
    }
    this.position = position;
    this.displayPosition = true;
}
}
