import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {RedisService} from "../../services/redis/redis.service";
import {HazelcastService} from "../../services/hazelcast/hazelcast.service";
@Injectable({
  providedIn: 'root'
})
export class TrendingService {
  constructor(private http: HttpClient,private RedisService: RedisService,private HazelcastService : HazelcastService) { }


  fetchAllTrendings(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL + "trending/all/day?api_key=" + GlobalConstants.TMDB_KEY;
    // return this.HazelcastService.getDataFromHazelcastCache(url);
    return this.RedisService.getDataFromRedisCache(url);
  }

  fetchMovieTrendings(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL + "trending/movie/week?api_key=" + GlobalConstants.TMDB_KEY;
    return this.RedisService.getDataFromRedisCache(url);
  }

  fetchTvTrendings(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL + "trending/tv/week?api_key=" + GlobalConstants.TMDB_KEY;
    return this.http.get<any>(url);
  }

  fetchPersonTrendings(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL + "trending/person/week?api_key=" + GlobalConstants.TMDB_KEY;
    return this.http.get<any>(url);
  }
  fetchTrendingMovies(): Observable<any> {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 180);
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    const endOfWeekStr = endOfWeek.toISOString().split('T')[0];
    const netflix = 8;
    const amazon = 9;
    const disneyplus = 384;
    const hulu = 15;

    const netflixRequest = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&vote_average.gte=3.5&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}&with_watch_providers=${netflix}&watch_region=US`;
    const amazonRequest = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&vote_average.gte=3.5&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}&with_watch_providers=${amazon}&watch_region=US`;
    const disneyplusRequest = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&vote_average.gte=3.5&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}&with_watch_providers=${disneyplus}&watch_region=US`;
    const huluRequest = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&vote_average.gte=3.5&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}&with_watch_providers=${hulu}&watch_region=US`;
    const netflixRequest$ = this.RedisService.getDataFromRedisCache(netflixRequest);
    const amazonRequest$ = this.RedisService.getDataFromRedisCache(amazonRequest);
    const disneyplusRequest$ = this.RedisService.getDataFromRedisCache(disneyplusRequest);
    const huluRequest$ = this.RedisService.getDataFromRedisCache(huluRequest);

    return forkJoin({ netflixRequest$, amazonRequest$, disneyplusRequest$, huluRequest$ });
  }



}
