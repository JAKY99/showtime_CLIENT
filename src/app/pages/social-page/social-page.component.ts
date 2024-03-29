import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SocialService} from "../../services/social/social.service";
import {faEllipsisVertical, faSearch, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {SocialUserModel} from "../../models/social_user/social-user-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {SocialUserDetailComponent} from "../../components/social-user-detail/social-user-detail.component";
import {Router} from "@angular/router";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
import {MediaDetailsDialogComponent} from "../../components/media-details-dialog/media-details-dialog.component";
import {MovieService} from "../../services/movie/movie.service";
import {TvService} from "../../services/tv/tv.service";

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPageComponent implements OnInit {
  @ViewChild('showDetailUserDialog') showDetailuser: SocialUserDetailComponent | undefined;
  @ViewChild('topLikedMoviesRef') topLikedChild: CarouselImageListComponent | undefined;
  @ViewChild('topWatchedMoviesRef') topWatchedChild: CarouselImageListComponent | undefined;
  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild: MediaDetailsDialogComponent | undefined;

  items: MenuItem[] = [];
  faEllipsisVertical = faEllipsisVertical;
  faSearch = faSearch;
  faTrophy = faTrophy;
  topuserList: SocialUserModel[] = []
  foundUserList: SocialUserModel[] = []
  topWatchedMovies: MovieDetailsModel[] = [];
  topLikedMovies: MovieDetailsModel[] = [];
  searchForm = new FormGroup({});
  showSearch: boolean = false;
  search: string = "";

  constructor(
    private SocialService: SocialService,
    private confirmationService: ConfirmationService,
    private TokenStorageService: TokenStorageService,
    private movieService: MovieService,
    private router: Router,
    private tvService: TvService
  ) {
  }

  ngOnInit(): void {
    this.tvService.fetchMostLikedSocialSeries().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.topLikedMovies = resp.results;
        // @ts-ignore
        this.topLikedChild?.isLoading = false;
      })
    this.movieService.fetchMostSpectacularMovies().toPromise()
      .then(resp => {
        resp = JSON.parse(resp.data);
        this.topWatchedMovies = resp.results;
        // @ts-ignore
        this.topWatchedChild?.isLoading = false;
      })
    this.fetchSocialInfo();
    this.searchForm = new FormGroup({
      userToFind: new FormControl('', [
        Validators.required,
      ]),
    });
    this.topuserList = []
    this.foundUserList = []
    this.items = [
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
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
    this.SocialService.fetchTopTenUserSocial().subscribe(
      (data: any) => {
        data.map((user: SocialUserModel) => {
          if (user.profilePicture == null || user.profilePicture == "") {
            user.profilePicture = "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
          }
          this.topuserList.push(user);
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  handleChangeSearch() {
    if (this.searchForm.get('userToFind')?.value == "") {
      this.showSearch = false;
      this.foundUserList = [];
    }
  }

  handleUserSearch(e: any) {
    e.preventDefault();
    let userToFind = this.searchForm.get('userToFind')?.value;
    this.search = userToFind;

    this.SocialService.fetchSocialInfoSearch(userToFind).subscribe(
      (data: any) => {
        this.showSearch = true;
        data.body.map((user: SocialUserModel) => {
          if (user.profilePicture == null || user.profilePicture == "") {
            user.profilePicture = "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
          }
          this.foundUserList.push(user);
        });
      },
      (err: any) => {
        console.log(err);
        this.showSearch = false;
      }
    );

  }

  showDetailUser(username: string) {
    this.showDetailuser?.open(username);
  }

  openDetailsDialog($event: any) {
    this.mediaDetailsDialogChild?.open($event);
  }
}
