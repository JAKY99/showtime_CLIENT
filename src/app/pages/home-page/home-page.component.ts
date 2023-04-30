import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MenuItem, MessageService} from "primeng/api";
import {MovieService} from "../../services/movie/movie.service";
import {TrendingService} from "../../services/trending/trending.service";
import {TvService} from "../../services/tv/tv.service";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";
import {TrendingModel} from "../../models/trendings/trending-model";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TvDetails} from "../../models/tv/tv-details";
import {faEllipsisVertical, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";
import {TokenStorageService} from "../../services/token-storage.service";
import {ConfirmationService} from 'primeng/api';
import {
  RecommendedMediaDialogComponent
} from "../../components/recommended-media-dialog/recommended-media-dialog.component";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  @ViewChild('trendings') trendingsChild: CarouselComponent | undefined;
  @ViewChild('moviesInTheatersRef') moviesInTheatersChild: CarouselImageListComponent | undefined;
  @ViewChild('topRatedMoviesRef') topRatedChild: CarouselImageListComponent | undefined;
  @ViewChild('upComingRef') upComingChild: CarouselImageListComponent | undefined;

  @ViewChild('topRatedTvRef') topRatedTvChild: CarouselImageListComponent | undefined;
  @ViewChild('popularTvRef') popularTvChild: CarouselImageListComponent | undefined;

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;
  @ViewChild('recommendMediaDialogRef') recommendMediaDialogChild: RecommendedMediaDialogComponent | undefined;

  faSearch = faSearch;
  faEllipsisVertical = faEllipsisVertical;

  trendingsList: TrendingModel[] = [];
  moviesInTheaters: MovieDetailsModel[] = [];
  newMovies: MovieDetailsModel[] = [];
  topRatedMovies: MovieDetailsModel[] = [];
  topRatedTv: TvDetails[] = [];
  upComingMovies: MovieDetailsModel[] = [];
  popularTv: TvDetails[] = [];
  items: MenuItem[] = [];
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
    private router: Router,
    private TokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userLocationData = resp;
      })
    this.trendingService.fetchAllTrendings().subscribe(resp => {
      resp = JSON.parse(resp.data);
      this.trendingsList = resp.results;
      // @ts-ignore
      this.trendingsChild?.isLoading = false;
    });
    this.movieService.fetchInTheaters(this.userLocationData.country_code2).subscribe(resp => {
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
    this.tvService.fetchTopRated().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.topRatedTv = resp.results;
        // @ts-ignore
        this.topRatedTvChild?.isLoading = false;
      })
    this.tvService.fetchPopular().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.popularTv = resp.results;
        // @ts-ignore
        this.popularTvChild?.isLoading = false;
      })
    this.items = [
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event) => {
          this.confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            message: 'Are you sure that you want to logout?',

            accept: () => {
              this.TokenStorageService.logOut();
            }
          });
        }

      }
    ];
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }

  openRecommendMediaDialog() {
    this.recommendMediaDialogChild?.open();
  }

}
