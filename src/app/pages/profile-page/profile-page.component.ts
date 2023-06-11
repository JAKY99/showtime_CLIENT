import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {TvDetails} from "../../models/tv/tv-details";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {ViewAllProfileListComponent} from "../../components/view-all-profile-list/view-all-profile-list.component";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {
  EditProfileDialogComponent
} from "../../components/edit-profile/edit-profile-dialog/edit-profile-dialog.component";
import {ProfileTopSectionComponent} from "../../components/profile-top-section/profile-top-section.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {TvService} from "../../services/tv/tv.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  @ViewChild('lastWatchedSeriesRef') lastWatchedSeriesChild: CarouselImageListComponent | undefined;
  @ViewChild('favoritesSeriesRef') favoritesSeriesChild: CarouselImageListComponent | undefined;
  @ViewChild('watchingSeriesRef') watchingSeriesChild: CarouselImageListComponent | undefined;
  @ViewChild('watchlistSeriesRef') watchlistSeriesChild: CarouselImageListComponent | undefined;

  @ViewChild('lastWatchedMoviesRef') lastWatchedMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild('favoritesMoviesRef') favoritesMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild('watchlistMoviesRef') watchlistMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild("viewAllProfileListRef") viewAllProfileListChild: ViewAllProfileListComponent | undefined;

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;
  @ViewChild('editProfileDialogRef') editProfileDialogChild: EditProfileDialogComponent | undefined;
  @ViewChild('profileTopSectionRef') profileTopSectionChild: ProfileTopSectionComponent | undefined;

  lastWatchedSeries: TvDetails[] = [];
  favoritesSeries: TvDetails[] = [];
  watchingSeries: TvDetails[] = [];
  watchListSeries: TvDetails[] = [];
  faEllipsisVertical = faEllipsisVertical;
  lastWatchedMovies: MovieDetailsModel[] = [];
  favoritesMovies: MovieDetailsModel[] = [];
  watchlistMovies: MovieDetailsModel[] = [];
  editMode: boolean = false;
  numberSeriesWatched: number = 0;

  numberMoviesWatched: number = 0;

  timeWatchedMovieMonthDaysHours: string = "0/0/0";
  timeWatchedSeriesMonthDaysHours: string = "0/0/0";
  lastWatchedMoviesTotal: number = 0;
  favoritesMoviesTotal: number = 0;
  watchlistMoviesTotal: number = 0;
  lastWatchedSeriesTotal: number = 0;
  favoritesSeriesTotal: number = 0;
  watching: number = 0;
  items: MenuItem[]=[];
  lastWatchedMoviesRangeServiceName: String = "MovieService";
  favoritesMoviesRangeServiceName: String = "MovieService";
  watchlistMoviesRangeServiceName: String = "MovieService";


  lastWatchedSeriesRangeServiceName: String = "";
  favoritesSeriesRangeServiceName: String = "";
  watchlistSeriesRangeServiceName: String = "";

  lastWatchedMoviesRangeMethodName: String = "lastWatchedMoviesRange";
  favoritesMoviesRangeMethodName: String = "favoritesMoviesRange";
  watchlistMoviesRangeMethodName: String = "watchlistMoviesRange";

  lastWatchedMoviesTitle: String = "Last Watched Movies";
  favoritesMoviesTitle: String = "Favorites Movies";
  watchlistMoviesTitle: String = "Watchlist Movies";

  lastWatchedSeriesRangeMethodName: String = "";
  favoritesSeriesRangeMethodName: String = "";
  watchlistSeriesRangeMethodName: String = "";
  Trophies: any[] = [];


  constructor(private profileService: ProfileService,
              private MovieService: MovieService,
              private TokenStorageService: TokenStorageService,
              private confirmationService: ConfirmationService,
              private deviceService: DeviceDetectorService,
              private tvService: TvService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    this.fetchProfileData();
    this.fetchTrophies();
    this.items = [
      {
        separator:true
      },
      {
        label:'Logout',
        icon:'pi pi-fw pi-power-off',
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

      },
    ];
  }

  async handleChangeTabView(e: any) {
    //tab: series
    if (e.index === 0) {
      //fetch series list here
    }
    //tab: movies
    if (e.index === 1) {
      //fetch movies list here
    }
  }

  async fetchProfileData() {
    try {
      await this.profileService.fetchProfile().subscribe((resp) => {
        setTimeout(() => {
          this.numberMoviesWatched = resp.body.numberOfWatchedMovies;
          this.numberSeriesWatched = resp.body.numberOfWatchedSeries;
          this.timeWatchedMovieMonthDaysHours = resp.body.totalTimeWatchedMovies;
          this.timeWatchedSeriesMonthDaysHours = resp.body.totalTimeWatchedSeries;

          this.fetchLastWatchedMovies();
          this.fetchLastWatchedSeries()
        }, 100)
      })
    } catch (e) {
      console.log(e)
    }


  }

  private async fetchLastWatchedSeries() {
    try {
      // @ts-ignore
      await this.profileService.fetchLastWatchedSeries().subscribe((resp) => {
          resp.forEach((item: any) => {
            this.tvService.fetchTvDetailsRaw(item).toPromise().then(
              respDetails => {
                respDetails = JSON.parse(respDetails.data);
                this.lastWatchedSeries.push(respDetails);
              })
            // @ts-ignore
            this.lastWatchedSeriesChild?.isLoading = false;
          })
      })

      await this.profileService.fetchfavoritesSeries().subscribe((resp) => {
        resp.forEach((item: any) => {
          this.tvService.fetchTvDetailsRaw(item).toPromise().then(
            respDetails => {
              respDetails = JSON.parse(respDetails.data);
              this.favoritesSeries.push(respDetails);
            })
          // @ts-ignore
          this.favoritesSeriesChild?.isLoading = false;
        })
      })
      await this.tvService.fetchTvWatching().toPromise()
        .then(resp => {
          resp.forEach((item: any) => {
            this.tvService.fetchTvDetailsRaw(item).toPromise().then(
              respDetails => {
                respDetails = JSON.parse(respDetails.data);
                this.watchingSeries.push(respDetails);
              })
            // @ts-ignore
            this.watchingSeriesChild?.isLoading = false;
          })
        })
      await this.profileService.fetchTvWatchlist().toPromise()
        .then(resp => {
          resp.forEach((item: any) => {
            this.tvService.fetchTvDetailsRaw(item).toPromise().then(
              respDetails => {
                respDetails = JSON.parse(respDetails.data);
                this.watchListSeries.push(respDetails);
              })
            // @ts-ignore
            this.watchlistSeriesChild?.isLoading = false;
          })
        })
      //
    } catch (e) {
      console.log(e)
    }
  }

  private async fetchLastWatchedMovies() {
    try {
      let dataToFetch: MovieDetailsModel[] = [];
      // @ts-ignore
      await this.profileService.fetchLastWatchedMovie().subscribe(async (resp) => {
        // @ts-ignore
        resp = resp.body
        this.lastWatchedMovies = [];
        this.favoritesMovies = [];
        this.watchlistMovies = [];
        // @ts-ignore
        let urlsToUseForLastWatchedMovies = await this.MovieService.generateUrlToFetch(resp.lastWatchedMovies);
        await this.MovieService.fetchGenerateUrlsArray(urlsToUseForLastWatchedMovies).subscribe((resp) => {
          // @ts-ignore
          resp = JSON.parse(resp.data);
          this.lastWatchedMovies.push(resp);
        });
        // @ts-ignore
        let urlsToUseForFavoritesMovies = await this.MovieService.generateUrlToFetch(resp.favoritesMovies);
        await this.MovieService.fetchGenerateUrlsArray(urlsToUseForFavoritesMovies).subscribe((resp) => {
          // @ts-ignore
          resp = JSON.parse(resp.data);
          this.favoritesMovies.push(resp);
        });
        // @ts-ignore
        let urlsToUseForWatchlistMovies = await this.MovieService.generateUrlToFetch(resp.watchlistMovies);

        await this.MovieService.fetchGenerateUrlsArray(urlsToUseForWatchlistMovies).subscribe((resp) => {
          // @ts-ignore
          resp = JSON.parse(resp.data);
          this.watchlistMovies.push(resp);
          // console.log(resp)
        });
        // @ts-ignore
        this.lastWatchedMoviesTotal = resp.totalWatchedMovies;
        // @ts-ignore
        this.favoritesMoviesTotal = resp.totalFavoritesMovies;
        // @ts-ignore
        this.watchlistMoviesTotal = resp.totalWatchlistMovies;
      })
    } catch (e) {
      console.log(e)
    }
  }
  private async fetchTrophies() {
    this.profileService.fetchTrophies(this.TokenStorageService.getClientUsername()).subscribe(
      (data: any) => {
        this.Trophies = data.body.trophies;
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("fetchSocialInfo");
  }
  public openViewAllProfileList(type: string) {
    // @ts-ignore
    this.viewAllProfileListChild?.open([...this[type]], this[type + "Total"], this[type + "RangeServiceName"], this[type + "RangeMethodName"], this[type + "Title"]);
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }

  openEditProfile() {
    this.editProfileDialogChild?.open();
  }

  updateProfileTopSection() {
    this.profileTopSectionChild?.loadBackground();
    this.profileTopSectionChild?.profileAvatarChild?.loadAvatar();
  }

}
