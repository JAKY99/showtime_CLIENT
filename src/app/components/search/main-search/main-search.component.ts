import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {SearchService} from "../../../services/search/search.service";
import {ExploreSearchModel} from "../../../models/search/search-model";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {SortDrawerComponent} from "../sort-drawer/sort-drawer.component";

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchComponent implements OnInit {

  @Output() resultsEmitterEvent = new EventEmitter<any>();
  @Output() resultsMoreEmitterEvent = new EventEmitter<any>();
  @Output() isLoading = new EventEmitter<any>();

  @ViewChild('sortDrawerRef')  sortDrawerChild: SortDrawerComponent | undefined;

  search: ExploreSearchModel  = {
    searchGlobalValue: '',
    page: 1
  }

  constructor(private searchService: SearchService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  async multiSearch(newSearch: boolean = false){
    this.isLoading.emit(true);
    if (this.search.searchGlobalValue){
      if (newSearch) this.search.page = 1;
      await this.searchService.multiSearch(this.search.searchGlobalValue, this.search.page)
        .toPromise().then(res => {
          if (newSearch){
            this.resultsEmitterEvent.emit(res);
          }else{
            this.resultsMoreEmitterEvent.emit(res);
          }
          this.isLoading.emit(false);
      });
    }
  }

  async multiSearchFilters(sort: string = ""){
    this.isLoading.emit(true);
  }

  goBack() {
    this.navigationService.back();
  }

  openSortDrawer() {
    this.sortDrawerChild?.open();
  }

  applySort($event: any){
    console.log($event)
  }
}
