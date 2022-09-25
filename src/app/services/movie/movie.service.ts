import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  fetchInTheaters(countryIso: string): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/now_playing?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1&region=" + countryIso;
    return this.http.get<any>(url);
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
    return this.http.get<any>(url);
  }

  fetchUpcoming(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "movie/upcoming?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.http.get<any>(url);
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

    return this.http.get<MovieDetailsModel>(url);
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
}
