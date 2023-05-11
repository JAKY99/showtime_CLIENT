import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TrendingService} from "../../services/trending/trending.service";
import {MainSearchComponent} from "../../components/search/main-search/main-search.component";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {TvService} from "../../services/tv/tv.service";

@Component({
  selector: 'app-main-search-page',
  templateUrl: './main-search-page.component.html',
  styleUrls: ['./main-search-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchPageComponent implements OnInit {

  @ViewChild('mainSearchRef') mainSearchChild: MainSearchComponent | undefined;
  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild : MediaDetailsDialogComponent | undefined;

  mainSearchResults: [] = [];
  trendingResults: [] = [];

  totalResults: number = 0;
  displayResult:number = 0;

  isLoading: boolean = false;
  isLoadMoreAvailable: boolean = true;
  param : number | undefined;

  constructor(
    private trendingService: TrendingService ,
    private route: ActivatedRoute ,
    private tvService : TvService
  ) {}

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.param = params.genre
        }
      );

    if(!this.param){
      this.trendingService.fetchAllTrendings().subscribe(resp => {
        resp = JSON.parse(resp.data);
        this.trendingResults = resp.results;
      });
    }else{
      // @ts-ignore
      this.tvService.fetchListByGenre(this.param).subscribe(resp => {
        resp = JSON.parse(resp.data);
        console.log(resp)
        this.trendingResults = resp.results;
        this.displayResult = 1;
        this.totalResults = resp.total_results
      });
    }


  }

  getMainSearchResults($event: any){
    // @ts-ignore
    this.mainSearchChild?.search.page = 1;
    this.isLoadMoreAvailable = true;
    this.mainSearchResults = $event.results;
    this.totalResults = $event.total_results;
    this.displayResult = 2
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

  openDetailsDialog($event: any){
    this.mediaDetailsDialogChild?.open($event)
  }
}
