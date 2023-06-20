import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {ActivatedRoute} from "@angular/router";
import {TvDetails} from "../../models/tv/tv-details";
import {GlobalConstants} from "../../common/constants/global-constants";
import {faBookmark, faStarHalfStroke, faChevronRight, faPlay, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {stringToDate} from "../../js/date-helper";
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {CarouselImageListComponent} from "../carousel-image-list/carousel-image-list.component";
import {TvSimilar} from "../../models/tv/tv-similar";
import {AccordionSeasonsComponent} from "../accordion-seasons/accordion-seasons.component";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {MessageService} from "primeng/api";
import {CommentService} from "../../services/comment/comment.service";
import {AddCommentDialogComponent} from "../comment/add-comment-dialog/add-comment-dialog.component";

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TvDetailsComponent implements OnInit {




  constructor(private tvService: TvService, private route: ActivatedRoute, private messageService: MessageService,private commentService: CommentService) {
  }

  @ViewChild('similarTvRef') similarTvChild: CarouselImageListComponent | undefined;
  @ViewChild('accordionSeasonsRef') accordionSeasonsChild: AccordionSeasonsComponent | undefined;
  @ViewChild('addCommentDialogRef') addCommentDialogChild : AddCommentDialogComponent | undefined;

  @Input() requestedTvId: number = 0;

  serieFullyWatchedEvent: string = "";
  private type: string ="serie";

  faBookmark = faBookmark;
  faStarHalfStroke = faStarHalfStroke;
  faFavorites : IconDefinition = faHeart;
  faChevronRight = faChevronRight;
  faPlay = faPlay;
  watchProviders: [] = [];
  isWatchProvidersEmpty = false;
  isInFavoritelist = false;
  isInWatchlist = false;
  seenStatus: string = "Not Seen";

  isLoadingStatusWatchList: boolean = false;
  isLoadingStatusSerie: boolean = false;
  isLoadingStatusFavorite: boolean = false;
  viewedStatus: boolean = false;
  viewedDialogShown: boolean = false;
  globalConstants = GlobalConstants;
  // @ts-ignore
  tv: TvDetails = {};
  // @ts-ignore
  lastEpisode: TvEpisodeDetails = {};
  lastEpisodeNumber: number = 0;
  lastEpisodeSeasonNumber: number = 0;
  lastEpisodeSeasonTmdbId: number = 0;
  // @ts-ignore
  similarTv: TvSimilar[] = [];
  resultComments: [] = [];
  resultUserComments: [] = [];
  userTv = {
    viewInfo: {
      checked: '',
      status: 'Not Seen',
    },
    favorite: {
      checked: '',
    },
    bookmark: {
      checked: '',
    }
  }

  // @ts-ignore
  loading = {
    tv: true,
    actors: true,
    watchProviders: true,
    isLoadingChildren: false
  }
  isCommentSectionActive: boolean = true;
  viewedAddDialogShown: boolean = false;
  viewedAddDialogPosition: string = "bottom";
  isClosable: boolean = true;
  isDissmissable:boolean = true;
  isButtonDisabled:boolean = false;
  isButtonIncreaseLoading: boolean = false;
  isButtonRemoveLoading: boolean = false;
  isAccordionLoadingData: boolean = true;
  isWatchNextLoadingData: boolean = true;

  async ngOnInit(): Promise<void> {
    this.commentService.postCommentEvent.subscribe((data) => {
      this.fetchComments();
      this.fetchUserComments();
    });
    await this.fetchWatchedSerieInfos();
    this.fetchComments();
    this.fetchUserComments();
  }

  getRateFormated(): number {
    // @ts-ignore
    return Math.round(this.tv.vote_average * 10) / 10
  }

  getTvYear() {
    // @ts-ignore
    return stringToDate(this.tv.first_air_date).getFullYear();
  }

  handleTvChange($event: any) {
    this.loading = {
      tv: true,
      actors: true,
      watchProviders: true,
      isLoadingChildren: false
    }
    this.requestedTvId = $event.id
    this.ngOnInit()
  }

  WatchProvidersEmpty($event: any) {
    this.isWatchProvidersEmpty = $event;
  }

  async handleChangeTabView(e: any) {
    //tab: trailers
    if (e.index === 0) {
    }
    //tab: comments
    if (e.index === 1) {
      // fetch async sur les episodes
    }
  }

  async handleChangeTabView2(e: any) {
    //tab: Comments
    if (e.index === 0) {
      this.fetchComments();
      this.isCommentSectionActive = true;
    }
    //tab: Similars
    if (e.index === 1) {
      this.isCommentSectionActive = false;
      // @ts-ignore
      await this.tvService.fetchSimilarTv(this.requestedTvId).toPromise()
        .then((resp) => {
          resp = JSON.parse(resp.data);
          this.similarTv = resp.results;
        });
      // @ts-ignore
      this.similarTvChild?.isLoading = false;
    }
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
      ['credits']
    ).subscribe(
      (resp) => {
        //@ts-ignore
        resp = JSON.parse(resp.data);
        setTimeout(() => {
          this.tv = resp;
          this.loading.tv = false;
        }, 100);
      }
    )

    this.tvService.fetchLastSeenEpisode(
      this.requestedTvId
    ).subscribe(
      (resp) => {
        if(resp.name!=="No episode to watch"){
          this.lastEpisodeNumber = resp.episode_number;
          this.tvService.fetchTvBySeasonAndEpisode(
            this.requestedTvId,
            resp.season_number,
            resp.episode_number
          ).subscribe(
            (resp2) => {
              resp2 = JSON.parse(resp2.data);
              this.lastEpisode = resp2;
              this.tvService.fetchSeasonOnlyDetails(this.requestedTvId, resp.season_number).subscribe((resp3) => {
                resp3 = JSON.parse(resp3.data);
                this.lastEpisodeSeasonTmdbId = resp3.id;
              });
            }
          );

        }
        if(resp.name=="No episode to watch"){
          return this.lastEpisode = resp;
        }
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

    await this.tvService.isTvInFavoritelist(this.requestedTvId).subscribe((resp) => {
      this.userTv.favorite.checked = resp ? 'checked' : '';
      this.isInFavoritelist = resp;
    })

    await this.tvService.isTvInWatchlist(this.requestedTvId).subscribe((resp) => {
      this.userTv.bookmark.checked = resp ? 'checked' : '';
      this.isInWatchlist = resp;
    })
  }

  async updateLastSeenEpisode() {
    this.tvService.fetchLastSeenEpisode(
      this.requestedTvId
    ).subscribe(
      (resp) => {
        if(resp.name!=="No episode to watch"){
          this.lastEpisodeNumber = resp.episode_number;
          this.tvService.fetchTvBySeasonAndEpisode(
            this.requestedTvId,
            resp.season_number,
            resp.episode_number
          ).subscribe(
            (resp2) => {
              resp2 = JSON.parse(resp2.data);
              this.lastEpisode = resp2;
              this.tvService.fetchSeasonOnlyDetails(this.requestedTvId, resp.season_number).subscribe((resp3) => {
                resp3 = JSON.parse(resp3.data);
                this.lastEpisodeSeasonTmdbId = resp3.id;
              });
            }
          );

        }
        if(resp.name=="No episode to watch"){
          return this.lastEpisode = resp;
        }

      }
    )
  }

  async updateSerieStatus() {
    if (this.viewedStatus) {
      this.viewedDialogShown = true;
    } else {
      await this.tvService.addSerieToWatchedList(
        // @ts-ignore
        this.tv.id,
        this.tv.name
      ).subscribe(
        (resp) => {
          this.fetchWatchedSerieInfos();
        }
      )
    }
  }
  addSerieToWatchedListDialog() {

    if(this.userTv.viewInfo.checked === 'SEEN') {
      this.viewedAddDialogShown = true;
    }
    if(this.userTv.viewInfo.checked !== 'SEEN') {
      this.addSerieToWatchedList();
    }
  }
  async addSerieToWatchedList() {
    this.tvService.triggerAddSerieToWatchlist("start")
    this.isLoadingStatusSerie = true;
    await this.tvService.addSerieToWatchedList(
      this.tv.id,
      this.tv.name
    ).subscribe(
      (resp) => {
        this.tvService.triggerAddSerieToWatchlist("end")
        this.loading.isLoadingChildren = true;
        this.fetchWatchedSerieInfos();
        this.updateSerieInfosFromChild(this.requestedTvId);
        this.isLoadingStatusSerie = false;

      }
    )
  }
  async reAddSerieToWatchedList() {
    this.tvService.triggerAddSerieToWatchlist("start")
    this.isLoadingStatusSerie = true;
    await this.tvService.reAddSerieToWatchedList(
      this.tv.id,
      this.tv.name
    ).subscribe(
      (resp) => {
        this.tvService.triggerAddSerieToWatchlist("end")
        this.loading.isLoadingChildren = true;
        this.fetchWatchedSerieInfos();
        this.updateSerieInfosFromChild(this.requestedTvId);
        this.isClosable = true;
        this.isDissmissable = true;
        this.isButtonIncreaseLoading = false;
        this.isButtonDisabled = false;

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

  updateSpecificEpisodeInSeasonAccordion($event : any) {
    this.accordionSeasonsChild?.updateSpecificEpisodeStatus($event);
  }

  async toggleTvInFavoritelist() {
    this.isLoadingStatusFavorite = true;

    await this.tvService.toggleTvInFavoritelist(this.requestedTvId).subscribe((resp) => {
      this.isInFavoritelist = resp;
      this.userTv.favorite.checked = resp ? 'checked' : '';
      if (resp) {
        this.addSingleToast(
          'success',
          'Tv Show added to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
        this.isLoadingStatusFavorite = false;

      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Tv Show removed to favorite list',
          'You can see your favorite list in the profile page',
          false
        )
        this.isLoadingStatusFavorite = false;

      }
    })
  }

  async toggleTvInWatchlist() {
    this.isLoadingStatusWatchList = true;
    await this.tvService.toggleTvInWatchlist(this.requestedTvId).subscribe((resp) => {
      this.isInWatchlist = resp;
      this.userTv.bookmark.checked = resp ? 'checked' : '';
      if (resp) {
        this.addSingleToast(
          'success',
          'Tv Show added to your Watchlist',
          'You can see your Watchlist in the profile page',
          false
        )
        this.isLoadingStatusWatchList = false;
      }
      if (!resp) {
        this.addSingleToast(
          'success',
          'Tv Show removed to your Watchlist or already seen',
          'You can see your Watchlist in the profile page',
          false
        )
        this.isLoadingStatusWatchList = false;
      }
    })
  }


  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

  fetchComments() {
    this.commentService.fetchComments(this.requestedTvId,this.type).subscribe((resp) => {
      this.resultComments = resp;
    }, (error) => {
      console.log(error);
    })
  }
  fetchUserComments() {
    this.commentService.fetchUserComments(this.requestedTvId,this.type).subscribe((resp) => {
      this.resultUserComments = resp;
    }, (error) => {
      console.log(error);
    })
  }
  openAddCommentDialog(){
    this.addCommentDialogChild?.open(this.requestedTvId,this.type,this.tv.name);
  }

  async increaseWatchedNumber () {
    this.tvService.triggerAddSerieToWatchlist("start")
    this.isClosable = false;
    this.isDissmissable = false;
    this.isButtonDisabled = true;
    this.isButtonIncreaseLoading = true;
    this.isLoadingStatusSerie = true;
    await this.reAddSerieToWatchedList();
  }

  removeFromViewInfo() {
    this.tvService.triggerRemoveSerieToWatchlist("start")
    this.isClosable = false;
    this.isDissmissable = false;
    this.isButtonDisabled = true;
    this.isButtonRemoveLoading = true;
    this.isLoadingStatusSerie = true;
    this.tvService.removeFromViewInfo(
      this.tv.id,
      this.tv.name
    ).subscribe(
      (resp) => {
        this.tvService.triggerRemoveSerieToWatchlist("end")
        this.viewedAddDialogShown = false;
        this.loading.isLoadingChildren = true;
        this.fetchWatchedSerieInfos();
        this.updateSerieInfosFromChild(this.requestedTvId);
        this.isLoadingStatusSerie = false;
        this.isClosable = true;
        this.isDissmissable = true;
        this.isButtonRemoveLoading = false;
        this.isButtonDisabled = false;
      }
    )

  }

  handleFirstLoadingAccordionDone($event: any) {
    this.isAccordionLoadingData = false;
  }


}
