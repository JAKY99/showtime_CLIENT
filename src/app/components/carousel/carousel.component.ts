import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import SwiperCore, {EffectCoverflow, Navigation, Pagination} from "swiper";
import {Router} from "@angular/router";
import {TrendingModel} from "../../models/trendings/trending-model";

SwiperCore.use([EffectCoverflow,Pagination, Navigation]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  isLoading: boolean = true;

  @Input() items: Array<TrendingModel> = [];

  globalConstants = GlobalConstants;

  swiperConfig: any = {
    effect:"coverflow",
    grabCursor: true,
    centeredSlides:true,
    spaceBetween: 30,
    slidesPerView: 2,
    coverflowEffect: {
      rotate: -20,
      stretch: 0,
      depth: 100,
      modifier: 1
    },
    pagination: {
      dynamicBullets: true
    },
    breakpoints: {
      500:{
        centeredSlides: false,
        effect:"cover",
        slidesPerView: 3,
        spaceBetween: 100,
        freeMode: true,
      },
      768:{
        centeredSlides: false,
        effect:"cover",
        slidesPerView: 4,
        spaceBetween: 50,
        freeMode: true,
      },
      1024: {
        centeredSlides: false,
        effect:"cover",
        slidesPerView: 6,
        spaceBetween: 50,
        freeMode: true,
      }
    }
  };

  constructor(private router: Router) {
  }

   ngOnInit(): void {
  }

  goToMovieDetails(idMovie: number){
    this.router.navigateByUrl('/movie/' + idMovie).then();
  }
}