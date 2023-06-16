import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {SocialService} from "../../services/social/social.service";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {TokenStorageService} from "../../services/token-storage.service";
import {CommentService} from "../../services/comment/comment.service";
import {ProfileService} from "../../services/profile/profile.service";

@Component({
  selector: 'app-social-user-detail',
  templateUrl: './social-user-detail.component.html',
  styleUrls: ['./social-user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialUserDetailComponent implements OnInit {

  @Input() username: string = "";
  About : string = ""
  Comments : string = ""
  Trophies : string = ""
  items: MenuItem[]=[];
  resultUserComments: [] = [];
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  faChevronDown = faChevronDown;
  faEllipsisVertical = faEllipsisVertical;
  numberSeriesWatched: number = 0;

  numberMoviesWatched: number = 0;

  timeWatchedMovieMonthDaysHours: string = "0/0/0";
  timeWatchedSeriesMonthDaysHours: string = "0/0/0";
  index: number = 1;
  constructor( private SocialService : SocialService,
               private confirmationService: ConfirmationService,
               private TokenStorageService: TokenStorageService,
               private changeDetector : ChangeDetectorRef,
                private commentService: CommentService,
               private profileService: ProfileService,
  ) { }

  ngOnInit(): void {


  }

  ngOnChanges(changes:SimpleChanges): void {
    this.fetchSocialInfo();
    this.fetchProfileData();
    this.items = [
      {
        separator:true
      },
      {
        label:'Logout',
        icon:'pi pi-fw pi-power-off',
        command: (event: Event) => {
          this.confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            message: 'Are you sure that you want to logout?',

            accept: () => {
              this.TokenStorageService.logOut();
            }
          });
        }

      }
    ];
  }

  private async fetchSocialInfo() {
    if(this.username == ""){
      return;
    }
    this.SocialService.fetchSocialInfoSearchDetail(this.username).subscribe(
      (data: any) => {
        this.About = data.body.about
        this.Trophies = data.body.trophies
        this.viewedDialogShown = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  open(username: string){
    this.username = username;
    this.fetchSocialInfo();
    this.fetchUserComments();
    this.fetchProfileData();
    this.index = 0;
    // setTimeout(() => {
    //   this.index = 0;
    // } , 1000);
  }
  close(){
    this.viewedDialogShown = false
  }
  fetchUserComments() {
    this.commentService.fetchUserAllComments(this.username).subscribe((resp) => {
      this.resultUserComments = resp;
    }, (error) => {
      console.log(error);
    })
  }

  async handleChangeTabView(e: any) {
    //tab: series
    if (e.index === 0) {
      //fetch series list here

    }
    //tab: movies
    if (e.index === 1) {
      //fetch movies list here
    }
    if (e.index === 2) {
      //fetch movies list here
    }
  }
  async fetchProfileData() {
    try {
      await this.profileService.fetchProfileForSocialDetail(this.username).subscribe((resp) => {
        setTimeout(() => {
          // @ts-ignore
          this.numberMoviesWatched = resp.body.numberOfWatchedMovies;
          // @ts-ignore
          this.numberSeriesWatched = resp.body.numberOfWatchedSeries;
          // @ts-ignore
          this.timeWatchedMovieMonthDaysHours = resp.body.totalTimeWatchedMovies;
          // @ts-ignore
          this.timeWatchedSeriesMonthDaysHours = resp.body.totalTimeWatchedSeries;
        }, 100)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
