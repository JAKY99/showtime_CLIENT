import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TvDetails} from "../../models/tv/tv-details";
import {TokenStorageService} from "../token-storage.service";
import {RedisService} from "../../services/redis/redis.service";


@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient,private RedisService : RedisService , private tokenStorage: TokenStorageService) { }

  fetchPopular(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/popular?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US&page=1";
    return this.RedisService.getDataFromRedisCache(url);
    // return this.http.get<any>(url);
  }

  fetchTvTopRated(): Observable<any> {
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

  fetchAllTvGenres(): Observable<any>{
    let url = GlobalConstants.TMDB_BASE_URL +
      "genre/tv/list?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US";

    return this.RedisService.getDataFromRedisCache(url);
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

  fetchTvDetailsRaw(tvId: number): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL +
      "tv/"+tvId+"?api_key=" +
      GlobalConstants.TMDB_KEY +
      "&language=en-US"
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

  fetchTvWatchedStatus(tmdbId: number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/isSerieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  fetchEpisodeWatchedStatus(serieTmdbId: number, seasonNumber : number, episodeNumber : number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/isSerieInWatchlist/`
    return this.http.post<any>(url, {
      serieTmdbId: serieTmdbId,
      seasonNumber : seasonNumber,
      episodeNumber : episodeNumber,
      userMail: this.tokenStorage.getClientUsername()
      // @ts-ignore
    }, httpOptions);
  }


  addSerieToWatchedList(tmdbId: number,SerieName : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addSerieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      SerieName: SerieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }
  removeSerieToWatchedList(tmdbId: number,SerieName : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/removeSerieInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbId,
      SerieName: SerieName,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  addSeasonToWatchedList(tmdbId: number , seasonId : number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addSeasonInWatchlist/`
    return this.http.post<any>(url, {
      tvTmdbId: tmdbId,
      userMail: this.tokenStorage.getClientUsername(),
      tvSeasonid : seasonId
    });
  }

  addEpisodeToWatchedList(tmdbId: number , seasonId : number | null, episodeId : number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/addEpisodeInWatchlist/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername(),
      tvTmdbId: tmdbId,
      tvSeasonid : seasonId,
      episodeId : episodeId
    });
  }

  fetchLastSeenEpisode(tmdbId: number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/getLastSeenEpisode/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername(),
      tmdbId: tmdbId
    });
  }

  fetchTvEpisodeWatchedStatus(episodeTmdbId: number): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/user/isEpisodeInWatchlist/`
    return this.http.post<any>(url, {
      episodeTmdbId: episodeTmdbId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  fetchTvSeasonWatchedStatus(tmdbTvId: number, seasonId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/isSeasonInWatchlist/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername(),
      tvTmdbId: tmdbTvId,
      tvSeasonid : seasonId
    });
  }

  fetchTvSerieWatchedStatus(tmdbTvId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/isSerieInWatchlist/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername(),
      tmdbId: tmdbTvId
    });
  }

  fetchNbEpisodesWatchedInSerie(tmdbTvId: number, seasonId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/nbEpisodesWatchedInSerie/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername(),
      tvSeasonid : seasonId,
      tvTmdbId: tmdbTvId
    });
  }

  fetchTvWatching() {
    let url = `${GlobalConstants.API_URL}/api/v1/user/fetchTvWatching/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername()
    });
  }



  isTvInFavoritelist(requestedTvId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/isTvInFavoritelist/`
    return this.http.post<any>(url, {
      tmdbId: requestedTvId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  isTvInWatchlist(requestedTvId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/isTvInWatchlistSeries/`
    return this.http.post<any>(url, {
      tmdbId: requestedTvId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  fetchTvWatched() {
    let url = `${GlobalConstants.API_URL}/api/v1/user/fetchTvWatched/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername()
    });
  }


  fetchListByGenre(idGenre : number): Observable <any>{
    let url = GlobalConstants.TMDB_BASE_URL + "discover/tv?api_key=" + GlobalConstants.TMDB_KEY +"&with_genres=" + idGenre +
      "&language=en-US&sort_by=popularity.desc";
    return this.RedisService.getDataFromRedisCache(url);
  }

  toggleTvInFavoritelist(tmdbTvId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/toggleTvInFavoritelist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbTvId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  toggleTvInWatchlist(tmdbTvId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/user/toggleTvInWatchlist/`
    return this.http.post<any>(url, {
      tmdbId: tmdbTvId,
      userMail: this.tokenStorage.getClientUsername()
    });
  }


}
