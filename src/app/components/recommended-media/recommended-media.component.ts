import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MovieService} from "../../services/movie/movie.service";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {MediaDetailsDialogComponent} from "../media-details-dialog/media-details-dialog.component";
import {stringToDate} from "../../js/date-helper";
import {PeopleService} from "../../services/people/people.service";
import {MovieCredits} from "../../models/movie/movie-credits";
import {GenreService} from "../../services/genre/genre.service";

@Component({
  selector: 'app-recommended-media',
  templateUrl: './recommended-media.component.html',
  styleUrls: ['./recommended-media.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendedMediaComponent implements OnInit {

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;

  isLoading: boolean = false;
  isLoadingSubData: boolean = false;
  isSaving: boolean = false;
  recommendedMedias: Array<MovieDetailsModel> = [];
  mediaGenres: any[] = [];
  mediaActors: { name: string, id: number }[] = [];

  constructor(private movieService: MovieService, private peopleService: PeopleService, private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true
    this.movieService.fetchRecommendedContentForUser().subscribe(
      (response) => {
        this.recommendedMedias = response.results;
        this.isLoading = false;
      }
    )
  }

  fetchGenres(idMedia: number | null) {
    if (idMedia) {
      this.mediaGenres = [];
      this.isLoadingSubData = true;
      const isMediaMovie = true;
      if (isMediaMovie) {
        this.movieService.fetchMovieDetails(idMedia).subscribe(
          response => {
            // @ts-ignore
            const movieDetails: MovieDetailsModel = JSON.parse(response.data);
            this.mediaGenres = movieDetails.genres;
            setTimeout(() => {
              this.isLoadingSubData = false;
            }, 500)
          }
        )
      } else {
        //fetchTvDetails
      }
    }
  }

  fetchPeople(idMedia: number | null) {
    if (idMedia) {
      this.mediaActors = []
      this.isLoadingSubData = true;
      this.peopleService.fetchMovieCredits(idMedia).subscribe(
        response => {
          let credits: MovieCredits = JSON.parse(response.data);
          credits.cast?.slice(0, 10).forEach(actor => {
            if (this.mediaActors && actor.name && actor.id) {
              this.mediaActors.push({name: actor.name, id: actor.id})
            }
          })
          setTimeout(() => {
            this.isLoadingSubData = false;
          }, 500)
        }
      )
    }
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }

  getMediaYear(date: string | null) {
    if (date) {
      return stringToDate(date).getFullYear();
    }
    return null
  }

  excludeActor(idActor: number) {
    this.isSaving = true;
    this.peopleService.excludeActor(idActor).subscribe(
      value => {
        this.isSaving = false;
        this.fetchData();
      }
    );
  }

  excludeGenre(idGenre: number) {
    this.isSaving = true;
    this.genreService.excludeGenre(idGenre).subscribe(
      value => {
        this.isSaving = false;
        this.fetchData();
      }
    );
  }
}
