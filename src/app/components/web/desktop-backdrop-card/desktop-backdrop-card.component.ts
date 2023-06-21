import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {stringToDate} from "../../../js/date-helper";
import {MovieService} from "../../../services/movie/movie.service";
import {MessageService} from "primeng/api";
import {faBookmark, faHeart, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {TvService} from "../../../services/tv/tv.service";

@Component({
  selector: 'app-desktop-backdrop-card',
  templateUrl: './desktop-backdrop-card.component.html',
  styleUrls: ['./desktop-backdrop-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesktopBackdropCardComponent implements OnInit {

  // @ts-ignore
  @Input() item: any = {};
  @Input() small: boolean = false;
  isLoading: boolean = true;
  isInFavoriteList: boolean = false;
  isInWatchlist: boolean = false;
  faFavorites : IconDefinition = faHeart;
  @Output() eventEmitter = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  isActionGoingOn: boolean = false;

  constructor(private movieService: MovieService,
              private messageService: MessageService,
              private tvService: TvService
  ) { }

  async ngOnInit(): Promise<void> {

    if (this.item.title){
      await this.movieService.isMovieInFavoritelist(this.item.id, this.item.title).subscribe((resp) => {
        this.isInFavoriteList = resp;
        this.isLoading = false;
      })
      await this.movieService.isMovieInMovieToWatchlist(this.item.id,this.item.title).subscribe((resp) => {
        this.isInWatchlist = resp;
        this.isLoading = false;
      })
    }else{
      await this.tvService.isTvInFavoritelist(this.item.id).subscribe((resp) => {
        this.isInFavoriteList = resp;
      })

      await this.tvService.isTvInWatchlist(this.item.id).subscribe((resp) => {
        this.isInWatchlist = resp;
      })
      this.isLoading = false;
    }
  }

  getMovieYear(releaseDate: any){
    // @ts-ignore
    return stringToDate(releaseDate).getFullYear();
  }

  getRateFormated(vote: any): number {
    // @ts-ignore
    return Math.round(vote * 10) / 10;
  }

  async toggleMediaFavorite() {
    if(this.isActionGoingOn === true){
      return;
    }
    if (this.item.title) {
      await this.toggleMovieInFavoriteList();
    }else{
      await this.toggleTvInFavoriteList();
    }
  }

  async toggleMediaWatchList() {
    if(this.isActionGoingOn === true){
      return;
    }
    if (this.item.title) {
      await this.toggleWatchlistMovie();
    }else{
      await this.toggleTvInWatchList();
    }
  }
  async toggleMovieInFavoriteList() {
    this.isActionGoingOn = true;
    await this.movieService.toggleMovieInFavoritelist(this.item.id, this.item.title).subscribe((resp) => {
      this.isInFavoriteList = resp;
      this.isActionGoingOn = false;
      if (resp) {
        this.addSingleToast(
          'success',
          'Movie added to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Movie removed to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
      }
      this.update.emit();
    })
  };

  async toggleWatchlistMovie() {
    this.isActionGoingOn = true;
    await this.movieService.toggleWatchlistMovie(this.item.id, this.item.title).subscribe((resp) => {
      this.isInWatchlist = resp;
      this.isActionGoingOn = false;
      if (resp) {
        this.addSingleToast(
          'success',
          'Movie added to watchlist',
          'You can see your watchlist in the profile page',
          false
        )
      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Movie removed to watchlist',
          'You can see your watchlist in the profile page',
          false
        )
      }
      this.update.emit();
    });
  }
  async toggleTvInFavoriteList() {
    this.isActionGoingOn = true;
    await this.tvService.toggleTvInFavoritelist(this.item.id).subscribe((resp) => {
      this.isInFavoriteList = resp;
      this.isActionGoingOn = false;
      if (resp) {
        this.addSingleToast(
          'success',
          'Tv Show added to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Tv Show removed to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
      }
      this.update.emit();
    })
  }
  async toggleTvInWatchList(){
    this.isActionGoingOn = true;
    await this.tvService.toggleTvInWatchlist(this.item.id).subscribe((resp) => {
      this.isInWatchlist = resp;
      this.isActionGoingOn = false;
      if (resp) {
        this.addSingleToast(
          'success',
          'Tv Show added to watchlist',
          'You can see your watchlist in the profile page',
          false
        )
      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Tv Show removed to watchlist',
          'You can see your watchlist in the profile page',
          false
        )
      }
      this.update.emit();
    });
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

  // @ts-ignore
  goToContentDetails(content: Object<any>) {
    this.eventEmitter.emit(content);
  }
}
