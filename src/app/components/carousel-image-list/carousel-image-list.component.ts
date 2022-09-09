import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";

import SwiperCore, { FreeMode, Navigation } from "swiper";

SwiperCore.use([FreeMode, Navigation]);

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
  swiperConfig: any = {
    slidesPerView: 2.3,
    spaceBetween: 5,
    freeMode: true,
    grabCursor: true,
    breakpoints: {
      768:{
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: false,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
        freeMode: false,
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }
}
