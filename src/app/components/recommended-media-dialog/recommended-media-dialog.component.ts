import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {MediaDetailsDialogComponent} from "../media-details-dialog/media-details-dialog.component";
import {RecommendedMediaComponent} from "../recommended-media/recommended-media.component";

@Component({
  selector: 'app-recommended-media-dialog',
  templateUrl: './recommended-media-dialog.component.html',
  styleUrls: ['./recommended-media-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendedMediaDialogComponent implements OnInit {

  @ViewChild('recommendedMediaRef') recommendedMediaChild: RecommendedMediaComponent | undefined;

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = true;
  viewedDialogPosition: string = 'bottom';

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.viewedDialogShown = false;
  }

  open(){
    this.viewedDialogShown = true;
    this.recommendedMediaChild?.fetchData();
  }

}
