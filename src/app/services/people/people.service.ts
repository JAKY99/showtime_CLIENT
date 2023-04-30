import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../common/constants/global-constants";
import {Observable} from "rxjs";
import {RedisService} from "../redis/redis.service";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient, private redisService: RedisService) {
  }

  fetchMovieCredits(idMedia: number): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL
      + "/movie/" + idMedia
      + "/credits?api_key=" + GlobalConstants.TMDB_KEY
      + "&language=en-US";

    return this.redisService.getDataFromRedisCache(url);
  }

  excludeActor(idActor: number): Observable<any> {
    const url = GlobalConstants.API_URL
      + "/api/v1/user/exclude/actor/"
      + idActor
    // @ts-ignore
    return this.http.put<any>(url);
  }
}
