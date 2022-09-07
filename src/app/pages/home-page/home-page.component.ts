import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {MovieService} from "../../services/movie/movie.service";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {TrendingService} from "../../services/trending/trending.service";
import {CarouselComponent} from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit {

  @ViewChild('trendings') trendingsChild : CarouselComponent | undefined;
  @ViewChild('moviesInTheatersRef') moviesInTheatersChild : CarouselImageListComponent | undefined;
  @ViewChild('topRatedRef') topRatedChild : CarouselImageListComponent | undefined;
  @ViewChild('upComingRef') upComingChild : CarouselImageListComponent | undefined;

  trendingsList: any[] = [];
  moviesInTheaters: any[] = [];
  newMovies: any[] = [];
  topRated: any[] = [];
  upComing: any[] = [];
  userLocationData = {
    country: {
      iso_code: ""
    }
  };

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private movieService: MovieService,
    private trendingService: TrendingService,
    private userGeoService: UserLocationDatasService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userLocationData = resp;
      })
    this.trendingService.fetchAllTrendings().toPromise().then(resp => {
      // @ts-ignore
      this.trendingsChild?.isLoading = false;
      this.trendingsList = resp.results;
    });
    this.movieService.fetchInTheaters(this.userLocationData.country.iso_code).toPromise()
      .then(resp => {
        // @ts-ignore
        this.moviesInTheatersChild?.isLoading = false;
        this.moviesInTheaters = resp.results;
      })
    this.movieService.fetchTopRated().toPromise()
      .then(resp => {
        // @ts-ignore
        this.topRatedChild?.isLoading = false;
        this.topRated = resp.results;
      })
    this.movieService.fetchUpcoming().toPromise()
      .then(resp => {
        // @ts-ignore
        this.upComingChild?.isLoading = false;
        this.upComing = resp.results;
      })
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

}
