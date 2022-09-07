import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";

import SwiperCore, { FreeMode } from "swiper";

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-carousel-image-list',
  templateUrl: './carousel-image-list.component.html',
  styleUrls: ['./carousel-image-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselImageListComponent implements OnInit {

  isLoading: boolean = true;

  @Input() items: any[] = [];

  globalConstants = GlobalConstants;

  constructor() { }

  ngOnInit(): void {
  }
}
