import {Injectable} from '@angular/core';
import {SearchParamsModel} from "../../models/search/searchParams";
import {FilterMetadata, LazyLoadEvent} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
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
}
