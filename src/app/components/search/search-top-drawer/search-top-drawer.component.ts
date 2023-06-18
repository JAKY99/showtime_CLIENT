import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService} from "../../../services/search/search.service";

@Component({
  selector: 'app-search-top-drawer',
  templateUrl: './search-top-drawer.component.html',
  styleUrls: ['./search-top-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchTopDrawerComponent implements OnInit {

  isSearchTopDrawerShown: boolean = true;
  viewedDialogPosition: string = "top";

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  open(){
    this.isSearchTopDrawerShown = true;
  }

  close(){
    this.isSearchTopDrawerShown = false;
  }

}
