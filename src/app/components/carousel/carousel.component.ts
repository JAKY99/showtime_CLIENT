import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import SwiperCore, {EffectCoverflow, Navigation, Pagination} from "swiper";
import {Router} from "@angular/router";
import {TrendingModel} from "../../models/trendings/trending-model";
import {DeviceDetectorService} from "ngx-device-detector";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  isLoading: boolean = true;

  @Input() items: any[] = [];
  @Output() eventEmitter = new EventEmitter<any>();

  globalConstants = GlobalConstants;

  swiperConfig: any = {
    effect: "coverflow",
    centeredSlides: true,
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
      500: {
        centeredSlides: false,
        effect: "cover",
        slidesPerView: 3,
        spaceBetween: 100,
        freeMode: true,
      },
      768: {
        centeredSlides: false,
        effect: "cover",
        slidesPerView: 4,
        spaceBetween: 50,
        freeMode: true,
      },
      1024: {
        centeredSlides: false,
        effect: "cover",
        slidesPerView: 6,
        spaceBetween: 50,
        freeMode: true,
      }
    }
  };

  constructor(private router: Router, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  // @ts-ignore
  goToContentDetails(content: Object<any>) {
    this.eventEmitter.emit(content);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
