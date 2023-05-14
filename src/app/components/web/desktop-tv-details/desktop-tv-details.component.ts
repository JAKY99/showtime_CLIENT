import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Trailer} from "../../../models/common/trailer";
import {
  faBookmark,
  faChevronRight,
  faHeart,
  faPlay,
  faStarHalfStroke,
  faUser,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {DomSanitizer} from "@angular/platform-browser";
import {stringToDate} from "../../../js/date-helper";
import {getImageCompletePath} from 'app/js/image-helper';
import {AccordionSeasonsComponent} from "../../accordion-seasons/accordion-seasons.component";
import {TvDetails} from "../../../models/tv/tv-details";
import {TvEpisodeDetails} from "../../../models/tv/tv-episode-details";
import {TvService} from "../../../services/tv/tv.service";
import country from 'country-list-js';

@Component({
  selector: 'app-desktop-tv-details',
  templateUrl: './desktop-tv-details.component.html',
  styleUrls: ['./desktop-tv-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesktopTvDetailsComponent implements OnInit {

  @ViewChild('accordionSeasonsRef') accordionSeasonsChild: AccordionSeasonsComponent | undefined;

  @Input() requestedTvId: number = 0;

  serieFullyWatchedEvent: string = "";
  countryOrigin = {
    name: ""
  };
  faBookmark = faBookmark;
  faStarHalfStroke = faStarHalfStroke;
  faChevronRight = faChevronRight;
  faPlay = faPlay;
  faUser = faUser;
  watchProviders: [] = [];
  isWatchProvidersEmpty = false;
  seenStatus: string = "Not Seen";
  resultsTrailer: Trailer[] = [];
  isInFavoriteList: boolean = false;
  isInWatchlist: boolean = false;
  faFavorites: IconDefinition = faHeart;
  viewedStatus: boolean = false;
  viewedDialogShown: boolean = false;
  // @ts-ignore
  tv: TvDetails = {};
  // @ts-ignore
  lastEpisode: TvEpisodeDetails = {};
  posterImage: {
    name: "",
    title: "",
    poster_path: ""
  } = {
    name: "",
    title: "",
    poster_path: ""
  }

  userTv = {
    bookmark: [],
    viewInfo: {
      checked: '',
      status: 'Not Seen',
    }
  }

  // @ts-ignore
  loading = {
    tv: true,
    actors: true,
    watchProviders: true,
    isLoadingChildren: false
  }

  constructor(private tvService: TvService, private route: ActivatedRoute,
              private messageService: MessageService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    await this.fetchWatchedSerieInfos();
  }

  getYoutubeTrailers() {

    let result = this.tv?.videos?.results.filter(
      x => x.type.toLowerCase() == 'trailer' &&
        x.site.toLowerCase() == 'youtube'
    );
    result?.forEach((trailer) => {
      trailer.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailer.key + '?autoplay=0');
    });
    this.resultsTrailer = result;
  }

  async addSerieToWatchedList() {
    await this.tvService.addSerieToWatchedList(
      this.tv.id,
      this.tv.name
    ).subscribe(
      (resp) => {
        this.loading.isLoadingChildren = true;
        this.fetchWatchedSerieInfos();
        this.updateSerieInfosFromChild(this.requestedTvId);
      }
    )
  }

  async fetchWatchedSerieInfos() {
    this.tvService.fetchTvWatchedStatus(this.requestedTvId).subscribe(
      (resp) => {
        // this.tv.status = resp.status
        this.seenStatus = resp.status;
        this.userTv.viewInfo.checked = resp.status.replace(" ", "").toUpperCase();
        this.loading.isLoadingChildren = false;
      }
    )

    await this.updateLastSeenEpisode();

    // @ts-ignore
    this.tvService.fetchTvDetails(
      this.requestedTvId,
      ['credits','videos','reviews', 'images']
    ).subscribe(
      (resp) => {
        //@ts-ignore
        resp = JSON.parse(resp.data);
        setTimeout(() => {
          this.tv = resp;
          this.loading.tv = false;
          // @ts-ignore
          this.posterImage = {
            // @ts-ignore
            poster_path: this.tv.poster_path
          }
          this.getYoutubeTrailers();
          // @ts-ignore
          this.countryOrigin = country.findByIso2(this.tv.origin_country[0])
        }, 100);
      }
    )

    this.tvService.fetchLastSeenEpisode(
      this.requestedTvId
    ).subscribe(
      (resp) => {
        this.tvService.fetchTvBySeasonAndEpisode(
          this.requestedTvId,
          resp.season_number,
          resp.episode_number
        ).subscribe(
          (resp2) => {
            resp2 = JSON.parse(resp2.data);
            this.lastEpisode = resp2;
          }
        );

      }
    )

    // @ts-ignore
    this.tvService.fetchWatchProviders(this.requestedTvId).subscribe(
      (resp) => {
        resp = JSON.parse(resp.data);
        this.watchProviders = resp.results;
        this.loading.watchProviders = false;
      }
    )
  }

  updateSerieInfosFromChild($event: any) {
    this.tvService.fetchTvWatchedStatus($event).subscribe(
      (resp) => {
        this.seenStatus = resp.status;
        this.userTv.viewInfo.checked = resp.status.replace(" ", "").toUpperCase();
      })
  }

  async updateLastSeenEpisode() {
    this.tvService.fetchLastSeenEpisode(
      this.requestedTvId
    ).subscribe(
      (resp) => {
        this.tvService.fetchTvBySeasonAndEpisode(
          this.requestedTvId,
          resp.season_number,
          resp.episode_number
        ).subscribe(
          (resp2) => {
            resp2 = JSON.parse(resp2.data);
            this.lastEpisode = resp2;
          }
        );

      }
    )
  }

  getRateFormat(): number {
    // @ts-ignore
    return Math.round(this.tv.vote_average * 10) / 10;
  }

  getTVDate(date: string) {
    // @ts-ignore
    return stringToDate(this.tv.first_air_date).toDateString();
  }

  getTVYear(date: string) {
    // @ts-ignore
    return stringToDate(date).getFullYear();
  }

  getImageCompletePath(profile_path: string | null, imageSize: string) {
    return getImageCompletePath(profile_path, imageSize);
  }

  getActorFirstname(actorName: string | null) {
    // @ts-ignore
    return actorName.split(' ')[0];
  }

  getActorLastname(actorName: string | null) {
    // @ts-ignore
    return actorName.split(' ')[1];
  }

  WatchProvidersEmpty($event: any) {
    this.isWatchProvidersEmpty = $event;
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

  protected readonly country = country;
}
