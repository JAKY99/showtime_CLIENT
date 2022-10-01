import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";

import SwiperCore, { FreeMode, Navigation, Lazy } from "swiper";
import {Router} from "@angular/router";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {TvDetails} from "../../models/tv/tv-details";

SwiperCore.use([FreeMode, Navigation, Lazy]);

@Component({
  selector: 'app-carousel-image-list',
  templateUrl: './carousel-image-list.component.html',
  styleUrls: ['./carousel-image-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselImageListComponent implements OnInit {

  isLoading: boolean = true;

  @Input() items: any[] = [];

  imgState: string = "";

  globalConstants = GlobalConstants;
  swiperConfig: any = {
    slidesPerView: 2.3,
    spaceBetween: 5,
    freeMode: true,
    lazy: true,
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  goToContentDetails(content: Object<any>){
    console.log(content)
    if (content.original_name){
      this.router.navigateByUrl('/tv/' + content.id);
    }else{
      this.router.navigateByUrl('/movie/' + content.id);
    }
  }
}