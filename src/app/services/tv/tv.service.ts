import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TvDetails} from "../../models/tv/tv-details";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {RedisService} from "../../services/redis/redis.service";
@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient,private RedisService : RedisService) { }

  fetchPopular(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/popular?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchTopRated(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/top_rated?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchAiringToday(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/airing_today?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchOnTheAir(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/on_the_air?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchWatchProviders(tvId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "tv/"+ tvId +
      "/watch/providers?api_key=" + GlobalConstants.TMDB_KEY;
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchSimilarTv(tvId: number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "/tv/"+ tvId +
      "/similar?api_key="+ GlobalConstants.TMDB_KEY+"&language=en-US&page=1"
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }


  fetchTvBySeasonAndEpisode(tvId: number , seasonNumber : number, episodeNumber : number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "tv/"+ tvId +
      "/season/" +seasonNumber + "/episode/" +
      episodeNumber + " ?api_key=" + GlobalConstants.TMDB_KEY;
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchTvBySeason(tvId: number , seasonNumber : number): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL + "tv/"+ tvId +
      "/season/" + seasonNumber + " ?api_key=" + GlobalConstants.TMDB_KEY;
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchTvDetails(tvId: number, responseToAppend?: Array<string>): Observable <TvDetails>{
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/"+tvId+"?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US"

    if (responseToAppend){
      url += "&append_to_response=";
      responseToAppend.forEach((x, index) => {
        url += x;
        if (index != responseToAppend.length -1) url += ','
      })
    }
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<TvDetails>(url);
  }
}
