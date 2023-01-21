import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TokenStorageService} from "../token-storage.service";
import { concatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HazelcastService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService){}



  getImageFromHazelcastCache(imageSource: string | null): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/hazelcast/get/image?urlApi=${imageSource}`
    return this.http.get<any>(url);
  }

  getDataFromHazelcastCache(urlApi : string): Observable<any>{
    let url = `${GlobalConstants.API_URL}/api/v1/hazelcast/get/data/`
    let trimmedUrl = urlApi.replace(" ", "");
    return this.http.post<any>(url, {
      urlApi: trimmedUrl,
    });
  }
}
