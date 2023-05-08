import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TokenStorageService} from "../token-storage.service";
import {UserAvatarModel} from "../../models/user/user-avatar-model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getLoggedInUser(): Observable<any>{
    let url = GlobalConstants.API_URL + "/api/v1/user/loggedin";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }
  getCurrentVersion(): Observable<any>{
    let url = GlobalConstants.API_URL + "/api/v1/version/get?type=client";
    // @ts-ignore
    return this.http.get<string>(
      url,
      // @ts-ignore
      httpOptions);
  }

  getNotifications() {
    let url = GlobalConstants.API_URL + "/api/v1/user/get/notifications";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }

  updateNotificationStatus() {
    let url = GlobalConstants.API_URL + "/api/v1/user/update/notifications";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }

  editAccountInfos(userData: UserAvatarModel): Observable<any> {
    const url = GlobalConstants.API_URL + "/api/v1/user/edit-account";
    return this.http.put<any>(
      url,
      userData
    );
  }
}
