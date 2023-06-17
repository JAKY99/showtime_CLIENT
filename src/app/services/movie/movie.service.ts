import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TokenStorageService} from "../token-storage.service";
import { concatMap } from 'rxjs/operators';
import {RedisService} from "../../services/redis/redis.service";
import {HazelcastService} from "../../services/hazelcast/hazelcast.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService,private RedisService: RedisService,private HazelcastService : HazelcastService){}

  fetchInTheaters(countryIso: string): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/now_playing?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1&region=" + countryIso;
    return this.RedisService.getDataFromRedisCache(url)
    // return this.HazelcastService.getDataFromHazelcastCache(url)
    // return this.http.get<any>(url);
  }
  fetchMoviesComingThisMonth(): Observable<any> {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1); // Get the start date of the 3-month period
    const currentDateStr = currentDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    const url = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&page=1&primary_release_date.gte=${startDateStr}&primary_release_date.lte=${currentDateStr}&with_release_type=3&with_origin_country=US|FR`;

    return this.RedisService.getDataFromRedisCache(url);
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
  }

  fetchUpcoming(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/upcoming?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url)
  }
  fetchPopular(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/popular?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url)
  }
  fetchNowPlaying(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/now_playing?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url)
  }
  fetchMostSpectacularMovies(): Observable<any> {
    const url = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=7.5&with_genres=18`;
    return this.RedisService.getDataFromRedisCache(url);
  }
  fetchPopularMovies(): Observable<any> {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear() - 5, 0, 1);
    const startOfYearStr = startOfYear.toISOString().split('T')[0];
    const endOfYearStr = currentDate.toISOString().split('T')[0];
    const url = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&page=1&primary_release_date.gte=${startOfYearStr}&primary_release_date.lte=${endOfYearStr}&with_origin_country=GB&vote_average.gte=7.5&sort_by=popularity.desc&without_original_language=jp`;
console.log(url)
    return this.RedisService.getDataFromRedisCache(url);
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
      concatMap(url =>this.RedisService.getDataFromRedisCache(url))
    )
  }
  fetchWatchProviders(movieId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "movie/"+ movieId +
      "/watch/providers?api_key=" + GlobalConstants.TMDB_KEY;
    return this.RedisService.getDataFromRedisCache(url)
  }

  fetchSimilarMovies(movieId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "/movie/"+ movieId +
      "/similar?api_key="+ GlobalConstants.TMDB_KEY+"&language=en-US&page=1"
    return this.RedisService.getDataFromRedisCache(url)
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
  addSerieToWatchedList(tmdbSerieId: number,serieName: string ):Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addSerieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbSerieId,
      movieName: serieName,
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

  postComment(elementId: number, commentText: any, elementTitle: string | null,typeElement:string) {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/saveComment`
    return this.http.post<any>(url, {
      elementId: elementId,
      commentText: commentText,
      userMail: this.tokenStorage.getClientUsername(),
      elementTitle: elementTitle,
      typeElement:typeElement

    });
  }

  fetchComments(requestedMovieId: number,type:string): Observable<any> {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/getComments/${requestedMovieId}?type=${type}`
    return this.http.get<any>(url);
  }

  fetchUserComments(elementId: number,type:string): Observable<any> {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/getUserComments/${elementId}?type=${type}`
    return this.http.get<any>(url);
  }

  fetchRecommendedContentForUser(){
    let url = `${GlobalConstants.API_URL}/api/v1/movie/recommended-for-user/`;
    return this.http.get<any>(url);
  }
}
