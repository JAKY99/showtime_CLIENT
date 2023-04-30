import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RedisService} from "../redis/redis.service";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient, private redis: RedisService) { }

  fetchGenres(): Observable<any> {
    const url = GlobalConstants.TMDB_BASE_URL
    + "genre/movie/list?api_key=" + GlobalConstants.TMDB_KEY
    + "&language=en-US";
    return this.redis.getDataFromRedisCache(url);
  }
}
