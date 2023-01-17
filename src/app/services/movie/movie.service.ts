import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TokenStorageService} from "../token-storage.service";
import { concatMap } from 'rxjs/operators';
import {RedisService} from "../../services/redis/redis.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService,private RedisService: RedisService){}

  fetchInTheaters(countryIso: string): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/now_playing?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1&region=" + countryIso;
    return this.RedisService.getDataFromRedisCache(url)
    // return this.http.get<any>(url);
  }

  fetchNewMovies(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/latest?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US";
    return this.http.get<any>(url);
  }

  fetchTopRated(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/top_rated?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url)
    // return this.http.get<any>(url);
  }

  fetchUpcoming(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/upcoming?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url)
    // return this.http.get<any>(url);
  }

  fetchMovieDetails(movieId: number, responseToAppend?: Array<string>): Observable<MovieDetailsModel>{

    let url = GlobalConstants.TMDB_BASE_URL + "movie/"+ movieId +
      "?api_key=" +GlobalConstants.TMDB_KEY+ "&language=en-US"

    if (responseToAppend){
      url += "&append_to_response=";
      responseToAppend.forEach((x, index) => {
        url += x;
        if (index != responseToAppend.length -1) url += ','
      })
    }
    return this.RedisService.getDataFromRedisCache(url)
    // return this.http.get<MovieDetailsModel>(url);

  }
  async generateUrlToFetch(movieIdList: number[], responseToAppend?: Array<string>): Promise<string[]>{
    let urls = [];
    for (let i = 0; i < movieIdList.length; i++) {
      let movieId = movieIdList[i];
      let url = GlobalConstants.TMDB_BASE_URL + "movie/" + movieId +
        "?api_key=" + GlobalConstants.TMDB_KEY + "&language=en-US"

      if (responseToAppend) {
        url += "&append_to_response=";
        responseToAppend.forEach((x, index) => {
          url += x;
          if (index != responseToAppend.length - 1) url += ','
        })
      }
      urls.push(url);
    }

    return urls;
  }
  fetchGenerateUrlsArray(urls: Array<string>): Observable<MovieDetailsModel> {
    const source = from(urls);
    return source.pipe(
      concatMap(url => this.http.get<MovieDetailsModel>(url))
    )
  }
  fetchWatchProviders(movieId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "movie/"+ movieId +
      "/watch/providers?api_key=" + GlobalConstants.TMDB_KEY;

    return this.http.get<any>(url);
  }

  fetchSimilarMovies(movieId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "/movie/"+ movieId +
      "/similar?api_key="+ GlobalConstants.TMDB_KEY+"&language=en-US&page=1"

    return this.http.get<any>(url);
  }

  fetchMovieWatchedStatus(tmdbId: number,movieName : string|null): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/isMovieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      userMail: this.tokenStorage.getClientUsername()
    // @ts-ignore
    }, httpOptions);
  }
  addMovieToWatchedList(tmdbId: number,movieName : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addMovieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      movieName: movieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }
  removeMovieToWatchedList(tmdbId: number,movieName : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/removeMovieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      movieName: movieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  increaseWatchedNumber(tmdbId: number,movieName : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addMovieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      movieName: movieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }
  isMovieInMovieToWatchlist(tmdbId: number,movieName : string|null): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/isMovieInMovieToWatchlist`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      movieName: movieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }
  toggleWatchlistMovie(tmdbId: number,movieName : string|null): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/toggleMovieInMovieToWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      movieName: movieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  toggleMovieInFavoritelist(requestedMovieId: number, title: string | null) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/toggleMovieInFavoritelist/`
    return this.http.post<any>(url, {
      tmdbId: requestedMovieId,
      movieName: title,
      userMail: this.tokenStorage.getClientUsername()
    });

  }

  isMovieInFavoritelist(requestedMovieId: number, title: string | null) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/isMovieInFavoritelist/`
    return this.http.post<any>(url, {
      tmdbId: requestedMovieId,
      movieName: title,
      userMail: this.tokenStorage.getClientUsername()
    });

  }
  lastWatchedMoviesRange(currentLength: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/lastWatchedMoviesRange/`
    return this.http.post<any>(url, {
      currentLength: currentLength,
      userMail: this.tokenStorage.getClientUsername()
    });

  }
  favoritesMoviesRange(currentLength: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/favoritesMoviesRange/`
    return this.http.post<any>(url, {
      currentLength: currentLength,
      userMail: this.tokenStorage.getClientUsername()
    });

  }
  watchlistMoviesRange(currentLength: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/watchlistMoviesRange/`
    return this.http.post<any>(url, {
      currentLength: currentLength,
      userMail: this.tokenStorage.getClientUsername()
    });

  }
}
