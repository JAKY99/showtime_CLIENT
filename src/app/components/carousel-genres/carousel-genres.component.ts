import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TvGenres} from "../../models/tv/tv-genres";
import {TvService} from "../../services/tv/tv.service";
import SwiperCore, {FreeMode} from "swiper";

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-carousel-genres',
  templateUrl: './carousel-genres.component.html',
  styleUrls: ['./carousel-genres.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CarouselGenresComponent implements OnInit {

  // @ts-ignore
  tvGenres:TvGenres[] = [];
  public genreTitle: string | undefined;


  constructor(
    private tvService: TvService
  ) {}

  @Input() customCategories : boolean = false;

  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 25,
    freeMode: true,
    lazy: true,
    grabCursor: true,
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

  loading = {
    tvGenres: true
  }

  async ngOnInit(): Promise <void> {

    // let genreTitle;

    if (!this.customCategories) {
      this.genreTitle = "All Genres"

      await this.tvService.fetchAllTvGenres().subscribe(
        (resp) => {
          resp = JSON.parse(resp.data);
          setTimeout(() => {
            this.tvGenres = resp.genres;
            this.loading.tvGenres = false;
            // console.log(this.tvGenres)
          }, 100)
        }
      )

    } else {


      // faire un recherche sur les 5catégories regardées les + regardées

      this.genreTitle = "Your Most Watched Genres"

      this.tvGenres = [
        {
          id: 10759,
          name: "Action & Adventure"
        },
        {
          id: 16,
          name: "Animation"
        }
      ];
      this.loading.tvGenres = false;
    }
  }
}
