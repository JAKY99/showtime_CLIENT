import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {MovieService} from "../../services/movie/movie.service";
import {TrendingService} from "../../services/trending/trending.service";
import {TvService} from "../../services/tv/tv.service";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";
import {TrendingModel} from "../../models/trendings/trending-model";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TvDetails} from "../../models/tv/tv-details";
import {Router} from "@angular/router";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";
import {TokenStorageService} from "../../services/token-storage.service";
import {
  RecommendedMediaDialogComponent
} from "../../components/recommended-media-dialog/recommended-media-dialog.component";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  @ViewChild('PopularMoviesRef') PopularMoviesChild?: CarouselComponent | undefined;
  @ViewChild('trendings') trendingsChild: CarouselComponent | undefined;
  @ViewChild('moviesInTheatersRef') moviesInTheatersChild: CarouselImageListComponent | undefined;
  @ViewChild('topRatedMoviesRef') topRatedChild: CarouselImageListComponent | undefined;
  @ViewChild('upComingRef') upComingChild: CarouselImageListComponent | undefined;

  @ViewChild('topRatedTvRef') topRatedTvChild: CarouselImageListComponent | undefined;
  @ViewChild('popularTvRef') popularTvChild: CarouselImageListComponent | undefined;

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;
  @ViewChild('recommendMediaDialogRef') recommendMediaDialogChild: RecommendedMediaDialogComponent | undefined;

  trendingsList: TrendingModel[] = [];
  moviesInTheaters: MovieDetailsModel[] = [];
  newMovies: MovieDetailsModel[] = [];
  topRatedMovies: MovieDetailsModel[] = [];
  topRatedTv: TvDetails[] = [];
  upComingMovies: MovieDetailsModel[] = [];
  popularTv: TvDetails[] = [];
  items: MenuItem[] = [];
  userLocationData = {
    country_code2: ""
  };
  PopularMovies: MovieDetailsModel[] = [];


  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private movieService: MovieService,
    private tvService: TvService,
    private trendingService: TrendingService,
    private userGeoService: UserLocationDatasService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userLocationData = resp;
      })
      .catch(err => {
        this.userLocationData = this.userGeoService.emulateLocation();
      });
    this.trendingService.fetchTrendingMovies().subscribe(resp => {
      this.trendingsList = [
        ...JSON.parse(resp.upcomingMovies$.data).results,
        ...JSON.parse(resp.netflixMovies$.data).results
      ];

      const uniqueTrendingsList = this.trendingsList.filter((movie, index, self) => {
        // Check if the movie's id is unique within the array
        return index === self.findIndex((m) => m.id === movie.id);
      });

      this.trendingsList = uniqueTrendingsList;
      // @ts-ignore
      this.trendingsChild?.isLoading = false;
    });
    this.movieService.fetchPopularMovies().subscribe(resp => {
      resp = JSON.parse(resp.data);
      this.PopularMovies = resp.results;
      // @ts-ignore
      this.PopularMoviesChild?.isLoading = false;
    })
    this.movieService.fetchMoviesComingThisMonth().subscribe(resp => {
      resp = JSON.parse(resp.data);
      this.moviesInTheaters = resp.results;
      // @ts-ignore
      this.moviesInTheatersChild?.isLoading = false;
    })
    this.movieService.fetchTopRated().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.topRatedMovies = resp.results;
        // @ts-ignore
        this.topRatedChild?.isLoading = false;
      })
    this.movieService.fetchUpcoming().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.upComingMovies = resp.results;
        // @ts-ignore
        this.upComingChild?.isLoading = false;
      })
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri], {queryParams: {movieOnly: true}}));
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }

  openRecommendMediaDialog() {
    this.recommendMediaDialogChild?.open();
  }

}
