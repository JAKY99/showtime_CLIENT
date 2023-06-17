import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

}
