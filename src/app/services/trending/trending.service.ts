import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";

@Injectable({
  providedIn: 'root'
})
export class TrendingService {
  constructor(private http: HttpClient) {
  }

  fetchTrendings(): Observable<any> {
    let url = GlobalConstants.TMDB_BASE_URL + "trending/all/week?api_key=" + GlobalConstants.TMDB_KEY;
    return this.http.get<any>(url);
  }
}
