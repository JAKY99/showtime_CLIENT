import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TrendingService} from "../../services/trending/trending.service";
import {MainSearchComponent} from "../../components/search/main-search/main-search.component";

@Component({
  selector: 'app-main-search-page',
  templateUrl: './main-search-page.component.html',
  styleUrls: ['./main-search-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchPageComponent implements OnInit {

  @ViewChild('mainSearchRef') mainSearchChild: MainSearchComponent | undefined;

  mainSearchResults: [] = [];
  trendingResults: [] = [];

  totalResults: number = 0;

  isLoading: boolean = false;
  isLoadMoreAvailable: boolean = true;

  constructor(private trendingService: TrendingService) { }

  ngOnInit(): void {
    this.trendingService.fetchAllTrendings().toPromise().then(resp => {
      this.trendingResults = resp.results;
    });
  }

  getMainSearchResults($event: any){
    // @ts-ignore
    this.mainSearchChild?.search.page = 1;
    this.isLoadMoreAvailable = true;
    this.mainSearchResults = $event.results;
    this.totalResults = $event.total_results;
    if($event.page === $event.total_pages){
      this.isLoadMoreAvailable = false;
    }
  }

  getMainSearchMoreResults($event: any){
    // @ts-ignore
    this.mainSearchResults.push(...$event.results);
    this.totalResults = $event.total_results;
    if($event.page === $event.total_pages){
      this.isLoadMoreAvailable = false;
    }
  }

  loadMoreResults(){
    // @ts-ignore
    this.mainSearchChild?.search.page += 1;
    this.mainSearchChild?.multiSearch();
  }

  manageLoading($event: any) {
    this.isLoading = $event
  }
}
