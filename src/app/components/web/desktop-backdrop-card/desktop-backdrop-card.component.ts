import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {stringToDate} from "../../../js/date-helper";
import {MovieService} from "../../../services/movie/movie.service";
import {MessageService} from "primeng/api";
import {faBookmark, faHeart, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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

  constructor(private movieService: MovieService, private messageService: MessageService) { }

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
    if (this.item.title) {
      await this.toggleMovieInFavoriteList();
    }else{
      this.addSingleToast(
        'error',
        'NOT IMPLEMENTED YET',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        false
      )
    }
  }

  async toggleMediaWatchList() {
    if (this.item.title) {
      await this.toggleWatchlistMovie();
    }else{
      this.addSingleToast(
        'error',
        'NOT IMPLEMENTED YET',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        false
      )
    }
  }
  async toggleMovieInFavoriteList() {
    await this.movieService.toggleMovieInFavoritelist(this.item.id, this.item.title).subscribe((resp) => {
      this.isInFavoriteList = resp;
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
    })
  };

  async toggleWatchlistMovie() {
    await this.movieService.toggleWatchlistMovie(this.item.id, this.item.title).subscribe((resp) => {
      this.isInWatchlist = resp;
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
