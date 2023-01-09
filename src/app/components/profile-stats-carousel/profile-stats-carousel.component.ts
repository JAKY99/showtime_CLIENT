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
    slidesPerView: 1.5,
    spaceBetween: 30,
    freeMode: true,
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

}
