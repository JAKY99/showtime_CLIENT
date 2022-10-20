import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-truncated-description',
  templateUrl: './truncated-description.component.html',
  styleUrls: ['./truncated-description.component.scss']
})
export class TruncatedDescriptionComponent implements OnInit {


  showMore = false;

  showMoreButton = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  truncated(index: number) {
    this.showMoreButton = index === null;
  }

  showComplete() {

  }

}
