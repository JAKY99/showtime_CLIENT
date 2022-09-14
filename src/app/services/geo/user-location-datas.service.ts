import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

@Injectable({
  providedIn: 'root'
})
export class UserLocationDatasService {

  constructor(private http: HttpClient) { }

  fetchLocationData(): Observable<any> {
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=a6dc28f69fb84a1193b0561cd77a41e0";
    console.log(url);
    return this.http.get<any>(url);
  }
}
