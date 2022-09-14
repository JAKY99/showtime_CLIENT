import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  fetchClientIPV4(): Observable<any> {
    let url = "https://api.ipgeolocation.io/getip";
    return this.http.get<any>(url);
  }
}
