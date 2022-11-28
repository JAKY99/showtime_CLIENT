import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {TvDetails} from "../../models/tv/tv-details";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('lastWatchedSeriesRef') lastWatchedSeriesChild : CarouselImageListComponent | undefined;
  @ViewChild('favoritesSeriesRef') favoritesSeriesChild : CarouselImageListComponent | undefined;
  @ViewChild('watchlistSeriesRef') watchlistSeriesChild : CarouselImageListComponent | undefined;

  @ViewChild('lastWatchedMoviesRef') lastWatchedMoviesChild : CarouselImageListComponent | undefined;
  @ViewChild('favoritesMoviesRef') favoritesMoviesChild : CarouselImageListComponent | undefined;
  @ViewChild('watchlistMoviesRef') watchlistMoviesChild : CarouselImageListComponent | undefined;

  lastWatchedSeries: TvDetails[] = [];
  favoritesSeries: TvDetails[] = [];
  watchlistSeries: TvDetails[] = [];

  lastWatchedMovies: TvDetails[] = [];
  favoritesMovies: TvDetails[] = [];
  watchlistMovies: TvDetails[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async handleChangeTabView(e: any) {
    //tab: series
    if (e.index === 0){
      //fetch series list here
    }
    //tab: movies
    if (e.index === 1){
      //fetch movies list here
    }
  }

}
