import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

SwiperCore.use([EffectCoverflow,Pagination]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  isLoading: boolean = true;

  @Input() items: any[] = [];

  globalConstants = GlobalConstants;

  constructor() {
  }

   ngOnInit(): void {
  }
}
