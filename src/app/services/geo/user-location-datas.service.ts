import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

@Injectable({
  providedIn: 'root'
})
export class UserLocationDatasService {

  constructor(private http: HttpClient) { }

  fetchLocationData(): Observable<any> {
    let url = "https://api.geoapify.com/v1/ipinfo?&apiKey=099b21de32b340ddb7e27a4a2f920d18";
    return this.http.get<any>(url);
  }
}
