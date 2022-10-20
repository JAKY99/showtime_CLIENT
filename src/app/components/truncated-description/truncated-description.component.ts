import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { EllipsisDirective } from 'ngx-ellipsis';

@Component({
  selector: 'app-truncated-description',
  templateUrl: './truncated-description.component.html',
  styleUrls: ['./truncated-description.component.scss']
})
export class TruncatedDescriptionComponent implements OnInit {

  @ViewChild(EllipsisDirective) ellipsisRef: EllipsisDirective | undefined;

  showMore = false;

  showMoreButton = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  truncated(index: number) {
    this.showMoreButton = index === null;
  }

  showComplete() {
    if (this.ellipsisRef) {
      this.showMore = true;
      this.cd.detectChanges();
      this.ellipsisRef.applyEllipsis();
    }

  }

}
