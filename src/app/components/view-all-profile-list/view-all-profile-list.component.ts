import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
@Component({
  selector: 'app-view-all-profile-list',
  templateUrl: './view-all-profile-list.component.html',
  styleUrls: ['./view-all-profile-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAllProfileListComponent implements OnInit {
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';

  faChevronDown =  faChevronDown;

  @Input() listData: [] = [];
  @Input() totalResults=0;
  isLoading: boolean = false;
  isLoadMoreAvailable:  boolean = false;
  serviceName :string = ""
  methodName :string = ""
  constructor(private ProfileService :  ProfileService, private MovieService : MovieService) { }

  ngOnInit(): void {
  }
 open(listData: [], totalResults: number,serviceName: string,methodName: string) {
    this.listData = listData;
    this.totalResults = totalResults;
    this.viewedDialogShown = true;
    this.isLoadMoreAvailable = totalResults > listData.length;
    this.serviceName = serviceName;
    this.methodName = methodName;
  }

  close() {
    this.viewedDialogShown = false;
  }

  async loadMoreResults() {
    this.isLoading = true;
      // @ts-ignore
      await this[this.serviceName][this.methodName](this.listData.length).subscribe(async (data: any) => {
        // @ts-ignore
        let urlsToUseForLoadMore = await this[this.serviceName].generateUrlToFetch(data.tmdbIdList);
        // @ts-ignore
        await this[this.serviceName].fetchGenerateUrlsArray(urlsToUseForLoadMore).subscribe((resp) => {
          // @ts-ignore
          this.listData.push(resp);
        });
        // @ts-ignore
        this.isLoadMoreAvailable = this.totalResults > [...this.listData, ...data.tmdbIdList].length;
      this.isLoading = false;
    });
  }
}
