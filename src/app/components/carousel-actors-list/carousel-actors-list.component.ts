import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import SwiperCore, { FreeMode } from "swiper";
import {MovieCredits, MovieCreditsCast, MovieCreditsCrew} from "../../models/movie/movie-credits";
import {getImageCompletePath} from "../../js/image-helper";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {TvCredits, TvCreditsCast} from "../../models/tv/tv-credits";
import {ActorDetailsDialogComponent} from "../actor/actor-details-dialog/actor-details-dialog.component";

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-carousel-actors-list',
  templateUrl: './carousel-actors-list.component.html',
  styleUrls: ['./carousel-actors-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselActorsListComponent implements OnInit {

  constructor() { }

  faUser = faUser;

  isLoading: boolean = true;

  @ViewChild('actorDetailsDialogRef') actorDetailsDialogChild: ActorDetailsDialogComponent | undefined;

  // @ts-ignore
  @Input() items: MovieCredits | TvCredits = {};
  // lors du fetch il faut remettre le type de l'objet dans l'objet pour pouvoir boucler proprement ici

  // @ts-ignore
  MovieCasts: Array<MovieCreditsCast > = [];
  TvCasts: Array<TvCreditsCast> = [];


  globalConstants = GlobalConstants;
  swiperConfig: any = {
    slidesPerView: 2.2,
    spaceBetween: 30,
    freeMode: true,
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

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {

    let arrayToReturn: any[] = [];
    // @ts-ignore
    if(this.items?.crew?.find(x => x.department === "Directing")){
      // @ts-ignore
      arrayToReturn.push(this.items?.crew?.find(x => x.department === "Directing"))
    }

    this.items.cast?.splice(0,19).forEach(x => {
      arrayToReturn.push(x);
    })

    this.isLoading = false;
    this.MovieCasts = arrayToReturn;
  }

  getImageCompletePath(profile_path: string | null, imageSize: string) {
    return getImageCompletePath(profile_path, imageSize);
  }

  getActorFirstname(actorName: string|null){
    // @ts-ignore
    return actorName.split(' ')[0];
  }

  getActorLastname(actorName: string | null){
    // @ts-ignore
    return actorName.split(' ')[1];
  }

  openActorDetails(idActor: number | null) {
    if (idActor) {
      this.actorDetailsDialogChild?.open(idActor);
    }
  }
}
