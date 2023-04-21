import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TokenStorageService} from "../token-storage.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})
export class SocialService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  fetchSocialInfo(): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/user/social/info";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);

  }

  fetchSocialInfoSearch(username: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/user/social/search/user";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }
  fetchSocialInfoSearchDetail(username: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/user/social/search/user/detail";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }
  fetchTopTenUserSocial(): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/user/social/topten";
    // @ts-ignore
    return this.http.post<string>(
      url,
      // @ts-ignore
      httpOptions);

  }
  fetchProfileAvatar(username: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/avatar";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }
  fetchProfileSocialInfos(username: string) {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/socialInfos";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }
}
