import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {SearchService} from "../../../services/search/search.service";
import {ExploreSearchModel} from "../../../models/search/search-model";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {SortDrawerComponent} from "../sort-drawer/sort-drawer.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchComponent implements OnInit {

  @Input() movieOnly: boolean = false;
  @Output() resultsEmitterEvent = new EventEmitter<any>();
  @Output() resultsMoreEmitterEvent = new EventEmitter<any>();
  @Output() isLoading = new EventEmitter<any>();

  @ViewChild('sortDrawerRef')  sortDrawerChild: SortDrawerComponent | undefined;

  search: ExploreSearchModel  = {
    searchGlobalValue: '',
    page: 1
  }
  placeholder: string = this.movieOnly?"Search movies...":"Search movies, series...";

  constructor(private searchService: SearchService,
              private navigationService: NavigationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Access query parameters using params object
      if(params['movieOnly']==='true'){
        this.movieOnly = true;
        this.placeholder = "Search movies...";
      }
    });
  }

  async multiSearch(newSearch: boolean = false){
    this.isLoading.emit(true);
    if (this.search.searchGlobalValue){
      if (newSearch) this.search.page = 1;
      if(!this.movieOnly){
        await this.searchService.multiSearch(this.search.searchGlobalValue, this.search.page)
          .toPromise().then(res => {
            res = JSON.parse(res.data);
            if (newSearch){
              this.resultsEmitterEvent.emit(res);
            }else{
              this.resultsMoreEmitterEvent.emit(res);
            }
            this.isLoading.emit(false);
          });
      }
      if(this.movieOnly){
        await this.searchService.movieSearch(this.search.searchGlobalValue, this.search.page)
          .toPromise().then(res => {
            res = JSON.parse(res.data);
            if (newSearch){
              this.resultsEmitterEvent.emit(res);
            }else{
              this.resultsMoreEmitterEvent.emit(res);
            }
            this.isLoading.emit(false);
          });
      }

    }
  }

  async multiSearchFilters(sort: string = ""){
    this.isLoading.emit(true);
  }

  goBack() {
    history.go(-1)
  }

  openSortDrawer() {
    this.sortDrawerChild?.open();
  }

  applySort($event: any){

  }
  handleChangeSearch(){
    if(this.search.searchGlobalValue == ""){
      this.resultsEmitterEvent.emit({
        "page": 1,
        "total_pages": 1,
        "results": [],
        "total_results": 0
      });
    }
  }
}
