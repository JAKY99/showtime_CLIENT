import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

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
}
