import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {MovieService} from "../../services/movie/movie.service";
import {TrendingService} from "../../services/trending/trending.service";
import {TvService} from "../../services/tv/tv.service";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";
import {TrendingModel} from "../../models/trendings/trending-model";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TvDetails} from "../../models/tv/tv-details";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  @ViewChild('trendings') trendingsChild : CarouselComponent | undefined;
  @ViewChild('moviesInTheatersRef') moviesInTheatersChild : CarouselImageListComponent | undefined;
  @ViewChild('topRatedMoviesRef') topRatedChild : CarouselImageListComponent | undefined;
  @ViewChild('upComingRef') upComingChild : CarouselImageListComponent | undefined;

  @ViewChild('topRatedTvRef') topRatedTvChild : CarouselImageListComponent | undefined;
  @ViewChild('popularTvRef') popularTvChild : CarouselImageListComponent | undefined;

  trendingsList: TrendingModel[] = [];
  moviesInTheaters: MovieDetailsModel[] = [];
  newMovies: MovieDetailsModel[] = [];
  topRatedMovies: MovieDetailsModel[] = [];
  topRatedTv: TvDetails[] = [];
  upComingMovies: MovieDetailsModel[] = [];
  popularTv: TvDetails[] = [];
  userLocationData = {
    ipv4: "",
    country_code2: ""
  };

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private movieService: MovieService,
    private tvService: TvService,
    private trendingService: TrendingService,
    private userGeoService: UserLocationDatasService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userLocationData = resp;
      })
    this.trendingService.fetchAllTrendings().toPromise().then(resp => {
      this.trendingsList = resp.results;
      // @ts-ignore
      this.trendingsChild?.isLoading = false;
    });
    this.movieService.fetchInTheaters(this.userLocationData.country_code2).toPromise()
      .then(resp => {
        this.moviesInTheaters = resp.results;
        // @ts-ignore
        this.moviesInTheatersChild?.isLoading = false;
      })
    this.movieService.fetchTopRated().toPromise()
      .then(resp => {
        this.topRatedMovies = resp.results;
        // @ts-ignore
        this.topRatedChild?.isLoading = false;
      })
    this.movieService.fetchUpcoming().toPromise()
      .then(resp => {
        this.upComingMovies = resp.results;
        // @ts-ignore
        this.upComingChild?.isLoading = false;
      })
    this.tvService.fetchTopRated().toPromise()
      .then(resp => {
        this.topRatedTv = resp.results;
        // @ts-ignore
        this.topRatedTvChild?.isLoading = false;
      })
    this.tvService.fetchPopular().toPromise()
      .then(resp => {
        this.popularTv = resp.results;
        // @ts-ignore
        this.popularTvChild?.isLoading = false;
      })
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

}
