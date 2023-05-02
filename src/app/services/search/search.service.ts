import {Injectable} from '@angular/core';
import {SearchParamsModel} from "../../models/search/searchParams";
import {LazyLoadEvent} from "primeng/api";
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RedisService} from "../../services/redis/redis.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})

export class SearchService {


  constructor(private http: HttpClient,private RedisService: RedisService) {
  }

  getSearchParams($event: LazyLoadEvent): SearchParamsModel {
    return {
      first: $event.first,
      limitRow: $event.rows,
      sort: {
        sortField: $event.sortField,
        sortOrder: $event.sortOrder
      },
      filters: $event.filters
    }
  }

  multiSearch(searchText: string, page: number): Observable<any>{
    let url = `${GlobalConstants.TMDB_BASE_URL}`;
    url += `search/multi?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`;
    return this.RedisService.getDataFromRedisCache(url)
  }
  movieSearch(searchText: string, page: number): Observable<any>{
    let url = `${GlobalConstants.TMDB_BASE_URL}`;
    url += `search/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`;
    return this.RedisService.getDataFromRedisCache(url)
    // return this.http.get<any>(url);
  }
  multiSearchFilters(searchText: string, page: number, sort: string = ""): Observable<any>{
    let url = `${GlobalConstants.TMDB_BASE_URL}`;
    url += `discover/movie?api_key=${GlobalConstants.TMDB_KEY}&language=en-US`;
    if (sort){
      url += `&sort_by=release_date.asc`;
    }
    url += `&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    return this.http.get<any>(url);
  }

}
