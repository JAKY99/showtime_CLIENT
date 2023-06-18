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
    startOfWeek.setDate(startOfWeek.getDate() - 10);
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    const endOfWeekStr = endOfWeek.toISOString().split('T')[0];
    const upcomingUrl = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}&with_origin_country=US&vote_average.gte=8&without_original_language=jp`;
    const netflixUrl = `${GlobalConstants.TMDB_BASE_URL}discover/movie?api_key=${GlobalConstants.TMDB_KEY}&&primary_release_date.gte=${startOfWeekStr}&primary_release_date.lte=${endOfWeekStr}language=en-US&page=1&sort_by=popularity.desc&with_watch_providers=8`;

    const upcomingMovies$ = this.RedisService.getDataFromRedisCache(upcomingUrl);
    const netflixMovies$ = this.RedisService.getDataFromRedisCache(netflixUrl);

    return forkJoin({upcomingMovies$, netflixMovies$});
  }


}
