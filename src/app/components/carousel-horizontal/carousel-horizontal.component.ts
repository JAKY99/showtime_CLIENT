import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TrendingService} from "../../services/trending/trending.service";
import {GlobalConstants} from "../../common/constants/global-constants";

@Component({
  selector: 'app-carousel-horizontal',
  templateUrl: './carousel-horizontal.component.html',
  styleUrls: ['./carousel-horizontal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselHorizontalComponent implements OnInit {

  @Input() carouselTitle!: string;

  trendings: any[] = [];
  responsiveOptions;
  globalConstants = GlobalConstants;

  constructor(private trendingService: TrendingService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  async ngOnInit(): Promise<void> {
    await this.trendingService.fetchTrendings().toPromise().then(resp => {
      this.trendings = resp.results;
    });
  }

}
