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
}
