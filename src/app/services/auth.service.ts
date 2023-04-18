import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/constants/global-constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: "plain/text",
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/login";
    return this.http.post<any>(url, {
      username: username,
      password: password
    // @ts-ignore
    }, httpOptions);
  }
  logout(): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/logout";
    return this.http.post<any>(url, {
      // @ts-ignore
    }, httpOptions);
  }
  googleLogin(token: string): Observable<any> {

    let url = GlobalConstants.API_URL + "/api/v1/login/google";
    return this.http.post<any>(url, {
      token: token
    // @ts-ignore
    }, httpOptions);
  }
  register(username: string, password: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/registration/user";
    return this.http.post<any>(url, {
      username: username,
      password: password

    // @ts-ignore
    }, httpOptions);
  }
  reset(username: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/registration/reset";
    return this.http.post<any>(url, {
      username: username,
    // @ts-ignore
    }, httpOptions);
  }

  checkToken(token: string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/registration/checkreset/" +token;
    return this.http.get<any>(url, {
    // @ts-ignore
    }, httpOptions);
  }

  changePassword(token: string,username:string ,password:string): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/registration/reset/password";
    return this.http.post<any>(url, {
      email: username,
      password: password,
      token: token
    // @ts-ignore
    }, httpOptions);
  }
}
