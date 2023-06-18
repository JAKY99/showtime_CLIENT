import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";

import SwiperCore, { FreeMode, Navigation, Lazy } from "swiper";
import {Router} from "@angular/router";

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
  @Output() eventEmitter = new EventEmitter<any>();

  imgState: string = "";

  globalConstants = GlobalConstants;
  swiperConfig: any = {
    slidesPerView: 1.5,
    spaceBetween: 5,
    freeMode: true,
    lazy: true,
    breakpoints: {
      320:{
        slidesPerView: 2.3,
        spaceBetween: 10,
        freeMode: true,
      },
      450:{
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true,
      },
      568:{
        slidesPerView: 3.5,
        spaceBetween: 10,
        freeMode: true,
      },
      620:{
        slidesPerView: 3.9,
        spaceBetween: 10,
        freeMode: true,
      },
      768:{
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: false,
      },
      795:{
        slidesPerView: 4.5,
        spaceBetween: 10,
        freeMode: false,
      },
      868:{
        slidesPerView:5,
        spaceBetween: 10,
        freeMode: false,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
        freeMode: false,
      },
      1280: {
        slidesPerView: 8,
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
    this.eventEmitter.emit(content);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
}
