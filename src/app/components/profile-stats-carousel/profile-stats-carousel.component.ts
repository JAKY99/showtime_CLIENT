import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-profile-stats-carousel',
  templateUrl: './profile-stats-carousel.component.html',
  styleUrls: ['./profile-stats-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileStatsCarouselComponent implements OnInit {
  @Input()
  numberSeriesWatched : number = 0;
  @Input()
  numberMoviesWatched : number= 0;
  @Input()
  timeWatchedMovieMonthDaysHours = "0/0/0";
  @Input()
  timeWatchedSeriesMonthDaysHours = "0/0/0";

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    // console.log("changes")
    // console.log(`${this.numberSeriesWatched} ${this.numberMoviesWatched} ${this.timeWatchedMovieMonthDaysHours} ${this.timeWatchedSeriesMonthDaysHours}`)
  }
  swiperConfig: any = {
    slidesPerView: 1,
    spaceBetween: 50,
    freeMode: true,
    breakpoints: {
      320:{
        slidesPerView: 1,
        spaceBetween: 10,
        freeMode: false,
      },
      400:{
        slidesPerView: 1.2,
        spaceBetween: 10,
        freeMode: false,
      },
      458:{
        slidesPerView: 1.5,
        spaceBetween: 10,
        freeMode: false,
      },
      520:{
        slidesPerView: 1.7,
        spaceBetween: 10,
        freeMode: false,
      },
      600:{
        slidesPerView: 1.9,
        spaceBetween: 10,
        freeMode: false,
      },
      768:{
        slidesPerView: 2.5,
        spaceBetween: 10,
        freeMode: false,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: false,
      }
    }
  };

}
