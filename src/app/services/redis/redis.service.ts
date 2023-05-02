import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TokenStorageService} from "../token-storage.service";
import { concatMap } from 'rxjs/operators';
// @ts-ignore
import { crypto } from 'crypto';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class RedisService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService){}

  getImageFromRedisCache(imageSource: string | null): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/redis/get/image?urlApi=${imageSource}`
    return this.http.get<any>(url);
  }

  getDataFromRedisCache(urlApi : string): Observable<any>{
    //@ts-ignore
    const encodedUrl = encodeURIComponent(urlApi.replaceAll(" ",""));
    let url = `${GlobalConstants.API_URL}/api/v1/redis/get/data?urlApi=${encodedUrl}`
    return this.http.get<any>(url);
  }
}
