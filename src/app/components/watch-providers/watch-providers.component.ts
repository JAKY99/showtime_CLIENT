import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MovieService} from "../../services/movie/movie.service";
import {ActivatedRoute} from "@angular/router";
import {Provider, WatchProvider} from "../../models/movie/watch-provider";
// @ts-ignore
import country from "country-list-js";
import {GlobalConstants} from "../../common/constants/global-constants";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";
import SwiperCore, { FreeMode, Navigation, Lazy } from "swiper";

SwiperCore.use([FreeMode, Navigation, Lazy]);

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WatchProvidersComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private userGeoService: UserLocationDatasService
  ) { }

  @Input() items: Array<WatchProvider> = [];
  @Input() streamProviders: boolean = true;
  @Input() rentProviders: boolean = true;
  @Input() buyProviders: boolean = true;
  @Input() title: boolean = true;
  @Output() noData = new EventEmitter();

  swiperConfig: any = {
    slidesPerView: 6,
    spaceBetween: 2,
    freeMode: true,
    grabCursor: true,
    lazy: true,
    breakpoints: {
      768:{
        slidesPerView: 9,
        spaceBetween: 10,
        freeMode: false,
      },
      1024: {
        slidesPerView: 12,
        spaceBetween: 10,
        freeMode: false,
      }
    }
  };

  GlobalConstant = GlobalConstants;

  loading: Boolean = true;
  countries: any[] = [];
  selectedCountry = {};
  userGeoData = {
    country_code2: ""
  };


  platformsStreamSub: Array<Provider> = [];
  platformsRent:Array<Provider> = [];
  platformsBuy: Array<Provider> = [];

  async ngOnInit(): Promise<void> {

    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userGeoData = resp;
      })
      .catch(err => {
        this.userGeoData = this.userGeoService.emulateLocation();
      });

    Object.entries(country.all).forEach(([keyCountry, valueCountry]) => {
      this.countries.push(valueCountry);
    });

    this.selectedCountry = this.countries.find(x => x.iso2 === this.userGeoData.country_code2);

    if (this.rentProviders) this.getWatchProviderRent();
    if (this.buyProviders) this.getWatchProviderBuy();
    if (this.streamProviders) this.getWatchProviderFlatrate();

    if (!this.platformsStreamSub.length && !this.platformsRent.length && !this.platformsBuy.length) {
      this.noData.emit(true);
    }
    this.loading = false;
  }

  getWatchProviderRent(){
    let item: WatchProvider;
    Object.entries(this.items).forEach(([key, value]) => {
      if(key == this.userGeoData.country_code2) {
        item = value;
      }
    })

    // @ts-ignore
    if(item?.rent) this.platformsRent = item.rent;
  }

  getWatchProviderBuy(){
    let item: WatchProvider;
    Object.entries(this.items).forEach(([key, value]) => {
      if(key == this.userGeoData.country_code2) {
        item = value;
      }
    })
    // @ts-ignore
    if(item?.buy) this.platformsBuy = item.buy;
  }

  getWatchProviderFlatrate(){
    let item: WatchProvider;
    Object.entries(this.items).forEach(([key, value]) => {
      if(key == this.userGeoData.country_code2) {
        item = value;
      }
    })
    // @ts-ignore
    if(item?.flatrate) this.platformsStreamSub = item.flatrate;
  }

}
