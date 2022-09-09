import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  fetchPopular(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/popular?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.http.get<any>(url);
  }

  fetchTopRated(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/top_rated?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.http.get<any>(url);
  }

  fetchAiringToday(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/airing_today?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.http.get<any>(url);
  }

  fetchOnTheAir(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/on_the_air?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.http.get<any>(url);
  }
}
