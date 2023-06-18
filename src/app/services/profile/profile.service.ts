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
export class ProfileService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

 fetchProfile(): Observable<any>{
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/header";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }

  fetchLastWatchedSeries() {
    let url = `${GlobalConstants.API_URL}/api/v1/user/fetchLastTvSeriesWatched/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername()
    });
  }
  fetchfavoritesSeries() {
    let url = `${GlobalConstants.API_URL}/api/v1/user/fetchfavoritesSeries/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  fetchTvWatchlist() {
    let url = `${GlobalConstants.API_URL}/api/v1/user/fetchTvWatchlist/`
    return this.http.post<any>(url, {
      userMail: this.tokenStorage.getClientUsername()
    });
  }

  fetchLastWatchedMovie() {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/lastWatchedMovies";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);

  }
  fetchProfileSocialInfos() {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/socialInfos";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);

  }

  uploadAvatar(formData: FormData) {
    let url = GlobalConstants.API_URL + "/api/v1/user/uploadProfilePicture";
    // @ts-ignore
    return this.http.post(
      url,
      formData
      );
  }

  fetchProfileAvatar() {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/avatar";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);

  }

  uploadBackground(formData: FormData) {
    let url = GlobalConstants.API_URL + "/api/v1/user/uploadBackgroundPicture";
    // @ts-ignore
    return this.http.post(
      url,
      formData
    );

  }

   fetchTempFileUrl() {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/tempForCrop";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }
  fetchAbout() {
    let url = GlobalConstants.API_URL + "/api/v1/user/get/about-you";
    // @ts-ignore
    return this.http.get<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }

  fetchTrophies(username: string) {
    let url = GlobalConstants.API_URL + "/api/v1/user/social/search/user/detail";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }

  fetchProfileForSocialDetail(username: string) {
    let url = GlobalConstants.API_URL + "/api/v1/user/profile/lazy/header";
    // @ts-ignore
    return this.http.post<string>(
      url,
      username,
      // @ts-ignore
      httpOptions);
  }
}
