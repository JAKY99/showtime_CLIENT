import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sort-drawer',
  templateUrl: './sort-drawer.component.html',
  styleUrls: ['./sort-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SortDrawerComponent implements OnInit {

  @Output() sortEventEmitter = new EventEmitter<any>();

  displayModal: boolean = false;

  sortDrawerPosition: string = "bottom";

  selectedSort: any = null;
  sortItems: any[] = [
    {name: 'Release date: Recent to Ancient', key: 'release_date.desc'},
    {name: 'Release date: Ancient to Recent', key: 'release_date.asc'},
    {name: 'Rate: Low to High', key: 'vote_average.asc'},
    {name: 'Rate: High to Low', key: 'vote_average.desc'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.displayModal = true;
  }

  close(){
    this.displayModal = false;
  }

  done(){
    this.displayModal = false;
    this.sortEventEmitter.emit(this.selectedSort);
  }

}
