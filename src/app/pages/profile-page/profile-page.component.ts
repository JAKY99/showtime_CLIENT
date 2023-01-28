import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {TvDetails} from "../../models/tv/tv-details";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {ViewAllProfileListComponent} from "../../components/view-all-profile-list/view-all-profile-list.component";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('lastWatchedSeriesRef') lastWatchedSeriesChild: CarouselImageListComponent | undefined;
  @ViewChild('favoritesSeriesRef') favoritesSeriesChild: CarouselImageListComponent | undefined;
  @ViewChild('watchlistSeriesRef') watchlistSeriesChild: CarouselImageListComponent | undefined;

  @ViewChild('lastWatchedMoviesRef') lastWatchedMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild('favoritesMoviesRef') favoritesMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild('watchlistMoviesRef') watchlistMoviesChild: CarouselImageListComponent | undefined;
  @ViewChild("viewAllProfileListRef") viewAllProfileListChild: ViewAllProfileListComponent | undefined;

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;

  lastWatchedSeries: TvDetails[] = [];
  favoritesSeries: TvDetails[] = [];
  watchlistSeries: TvDetails[] = [];

  lastWatchedMovies: MovieDetailsModel[] = [];
  favoritesMovies: MovieDetailsModel[] = [];
  watchlistMovies: MovieDetailsModel[] = [];

  numberSeriesWatched: number = 0;

  numberMoviesWatched: number = 0;

  timeWatchedMovieMonthDaysHours: string = "0/0/0";
  timeWatchedSeriesMonthDaysHours: string = "0/0/0";
  lastWatchedMoviesTotal: number = 0;
  favoritesMoviesTotal: number = 0;
  watchlistMoviesTotal: number = 0;
  lastWatchedSeriesTotal: number = 0;
  favoritesSeriesTotal: number = 0;
  watchlistSeriesTotal: number = 0;

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

  constructor(private ProfileService: ProfileService, private MovieService: MovieService) {
  }

  ngOnInit(): void {
    this.fetchProfileData();
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

  private async fetchProfileData() {
    try {
      await this.ProfileService.fetchProfile().subscribe((resp) => {
        setTimeout(() => {
          this.numberMoviesWatched = resp.body.numberOfWatchedMovies;
          this.numberSeriesWatched = resp.body.numberOfWatchedSeries;
          this.timeWatchedMovieMonthDaysHours = resp.body.totalTimeWatchedMovies;
          this.timeWatchedSeriesMonthDaysHours = resp.body.totalTimeWatchedSeries;

          this.fetchLastWatchedMovies();
        }, 100)
      })
    } catch (e) {
      console.log(e)
    }


  }

  private async fetchLastWatchedSeries() {
    try {
      // @ts-ignore
      await this.ProfileService.fetchLastWatchedSeries().subscribe((resp) => {
        setTimeout(() => {
          // @ts-ignore
          this.lastWatchedSeries = resp.lastWatchedSeries;
          // @ts-ignore
          this.favoritesSeries = resp.favoritesSeries;
          // @ts-ignore
          this.watchlistSeries = resp.watchlistSeries;
        }, 100)
      })
    } catch (e) {
      console.log(e)
    }
  }

  private async fetchLastWatchedMovies() {
    try {
      let dataToFetch: MovieDetailsModel[] = [];
      // @ts-ignore
      await this.ProfileService.fetchLastWatchedMovie().subscribe(async (resp) => {
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

  public openViewAllProfileList(type: string) {
    // @ts-ignore
    this.viewAllProfileListChild?.open(this[type], this[type + "Total"], this[type + "RangeServiceName"], this[type + "RangeMethodName"], this[type + "Title"]);
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }

}
