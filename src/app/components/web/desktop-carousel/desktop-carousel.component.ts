import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import SwiperCore, {EffectCoverflow, Navigation, Pagination} from "swiper";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-desktop-carousel',
  templateUrl: './desktop-carousel.component.html',
  styleUrls: ['./desktop-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesktopCarouselComponent implements OnInit {

  isLoading: boolean = false;

  @Input() items: any[] = [];
  @Input() small: boolean = false;
  @Output() eventEmitter = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  swiperConfigDefault: any = {
    centeredSlides: false,
    spaceBetween: 30,
    slidesPerView: 2.5,
    freeMode: true,
    breakpoints: {
      740: {
        spaceBetween: 60,
        slidesPerView: 1,
      },
      1400: {
        spaceBetween: 60,
        slidesPerView: 1.6,
      },
      1750: {
        spaceBetween: 60,
        slidesPerView: 2.1,
      },
      2040: {
        spaceBetween: 60,
        slidesPerView: 2.2,
      },
      2100: {
        spaceBetween: 60,
        slidesPerView: 2.6,
      },
      2350: {
        spaceBetween: 60,
        slidesPerView: 3.1,
      }
    }
  };

  swiperConfigSmall: any = {
    centeredSlides: false,
    spaceBetween: 30,
    slidesPerView: 2.5,
    freeMode: true,
    breakpoints: {
      740: {
        spaceBetween: 60,
        slidesPerView: 1.8,
      },
      1400: {
        spaceBetween: 60,
        slidesPerView: 2.2,
      },
      1750: {
        spaceBetween: 80,
        slidesPerView: 2.9,
      },
      2040: {
        spaceBetween: 60,
        slidesPerView: 3.3,
      },
      2100: {
        spaceBetween: 60,
        slidesPerView: 3.5,
      },
      2350: {
        spaceBetween: 60,
        slidesPerView: 4.3,
      }
    }
  };

}
