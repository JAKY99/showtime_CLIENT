// noinspection DuplicatedCode
import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MovieDetailsModel} from "../../../models/movie/movie-details-model";
import {MovieService} from "../../../services/movie/movie.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {DomSanitizer} from "@angular/platform-browser";
import {Trailer} from "../../../models/common/trailer";
import {faBookmark, faHeart, faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../../js/date-helper";
import {getImageCompletePath} from 'app/js/image-helper';
import {AddCommentDialogComponent} from "../../comment/add-comment-dialog/add-comment-dialog.component";
import {ActorDetailsDialogComponent} from "../../actor/actor-details-dialog/actor-details-dialog.component";

@Component({
  selector: 'app-desktop-movie-details',
  templateUrl: './desktop-movie-details.component.html',
  styleUrls: ['./desktop-movie-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesktopMovieDetailsComponent implements OnInit {

  @ViewChild('actorDetailsDialogRef') actorDetailsDialogChild: ActorDetailsDialogComponent | undefined;

  @Input() requestedMovieId: number = 0;
  // @ts-ignore
  movie: MovieDetailsModel;
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = "center";
  resultsTrailer: Trailer[] = [];
  isInFavoriteList: boolean = false;
  isInWatchlist: boolean = false;
  faFavorites: IconDefinition = faHeart;
  faBookmark: IconDefinition = faBookmark;
  faUser: IconDefinition = faUser;
  posterImage: {
    name: "",
    title: "",
    poster_path: ""
  } = {
    name: "",
    title: "",
    poster_path: ""
  }
  userMovie = {
    bookmark: {
      checked: '',
    },
    viewInfo: {
      checked: '',
    },
    favorite: {
      checked: '',
    }
  }
  seenStatus: string = 'Not Seen';
  viewedStatus: boolean = false;
  loading = {
    movie: true,
    actors: true,
    watchProviders: true,
    userViewInfo: true
  }

  constructor(private movieService: MovieService, private route: ActivatedRoute,
              private messageService: MessageService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    await this.movieService.fetchMovieDetails(this.requestedMovieId,
      ['credits', 'videos', 'images', 'reviews']).subscribe(
      (resp) => {
        // @ts-ignore
        resp = JSON.parse(resp.data);
        setTimeout(async () => {
          this.movie = resp;
          this.posterImage = {
            // @ts-ignore
            poster_path: this.movie.poster_path
          }
          this.loading.movie = false;
          this.getYoutubeTrailers()
          await this.fetchWatchedInfos();
        }, 50)
      }
    )
  }

  getYoutubeTrailers() {

    let result = this.movie?.videos?.results.filter(
      x => x.type.toLowerCase() == 'trailer' &&
        x.site.toLowerCase() == 'youtube'
    );
    result?.forEach((trailer) => {
      trailer.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailer.key + '?autoplay=0');
    });
    this.resultsTrailer = result;
  }

  getRateFormat(): number {
    // @ts-ignore
    return Math.round(this.movie.vote_average * 10) / 10;
  }

  async toggleMovieInFavoriteList() {
    await this.movieService.toggleMovieInFavoritelist(this.requestedMovieId, this.movie.title).subscribe((resp) => {
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
    await this.movieService.toggleWatchlistMovie(this.requestedMovieId, this.movie.title).subscribe((resp) => {
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

  async fetchWatchedInfos() {
    await this.movieService.fetchMovieWatchedStatus(this.requestedMovieId, this.movie.title).subscribe(
      (resp) => {
        this.userMovie.viewInfo.checked = resp.body ? 'checked' : '';
        this.viewedStatus = resp.body;
        this.seenStatus = resp.body ? 'Seen' : 'Not Seen';
        this.loading.userViewInfo = false;
      }
    )
    await this.movieService.isMovieInMovieToWatchlist(this.requestedMovieId, this.movie.title).subscribe((resp) => {
      this.userMovie.bookmark.checked = resp ? 'checked' : '';
      this.isInWatchlist = resp;
    })
    await this.movieService.isMovieInFavoritelist(this.requestedMovieId, this.movie.title).subscribe((resp) => {
      this.userMovie.favorite.checked = resp ? 'checked' : '';
      this.isInFavoriteList = resp;
    })

  }

  async showViewedDialog() {
    if (this.viewedStatus) {
      this.viewedDialogShown = true;
    } else {
      await this.movieService.addMovieToWatchedList(
        // @ts-ignore
        this.requestedMovieId, this.movie.title
      ).subscribe(
        (resp) => {
          this.fetchWatchedInfos();
        }
      )
    }
  }

  async increaseWatchedNumber() {
    // @ts-ignore
    await this.movieService.increaseWatchedNumber(this.requestedMovieId).subscribe(
      (resp) => {
        this.viewedDialogShown = false;
        this.fetchWatchedInfos();
      }
    )
  }

  async removeMovieFromViewInfo() {
    await this.movieService.removeMovieToWatchedList(
      // @ts-ignore
      this.requestedMovieId, this.movie.original_title
    ).subscribe(
      (resp) => {
        this.viewedDialogShown = false;
        this.fetchWatchedInfos();
      }
    )
  }

  getMovieYear() {
    // @ts-ignore
    return stringToDate(this.movie.release_date).toDateString();
  }


  getImageCompletePath(profile_path: string | null, imageSize: string) {
    return getImageCompletePath(profile_path, imageSize);
  }

  getActorFirstname(actorName: string | null) {
    // @ts-ignore
    return actorName.split(' ')[0];
  }

  getActorLastname(actorName: string | null) {
    // @ts-ignore
    return actorName.split(' ')[1];
  }

  openActorDetails(idActor: number | null) {
    if (idActor) {
      this.actorDetailsDialogChild?.open(idActor);
    }
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

}
