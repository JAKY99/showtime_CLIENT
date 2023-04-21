import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SocialService} from "../../services/social/social.service";
import {faEllipsisVertical,faSearch,faTrophy} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {SocialUserModel} from "../../models/social_user/social-user-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../common/validators/emailValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {CarouselImageListComponent} from "../../components/carousel-image-list/carousel-image-list.component";
import {SocialUserDetailComponent} from "../../components/social-user-detail/social-user-detail.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPageComponent implements OnInit {
  @ViewChild('showDetailUserDialog') showDetailuser: SocialUserDetailComponent | undefined;
  items: MenuItem[]=[];
  faEllipsisVertical = faEllipsisVertical;
  faSearch = faSearch;
  faTrophy = faTrophy;
  topuserList: SocialUserModel[] = []
  foundUserList: SocialUserModel[] = []
  searchForm = new FormGroup({});
  showsearch: string="hidesearch";
  search: string = "";

  constructor(
    private SocialService : SocialService,
    private confirmationService: ConfirmationService,
    private TokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.fetchSocialInfo();
    this.searchForm = new FormGroup({
      userToFind: new FormControl('',[
        Validators.required,
      ]),
    });
    this.topuserList = [

    ]
    this.foundUserList=[
    ]
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
     this.SocialService.fetchTopTenUserSocial().subscribe(
      (data: any) => {
        console.log(data);
        data.map((user: SocialUserModel) => {
          if(user.profilePicture == null||user.profilePicture == ""){
            user.profilePicture = "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
          }
          this.topuserList.push(user);
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("fetchSocialInfo");
  }

  handleChangeSearch(){
    if(this.searchForm.get('userToFind')?.value == ""){
      this.showsearch="hidesearch";
      this.foundUserList=[];
      // @ts-ignore
      document.getElementById('userContainer').style.display = 'block';
    }
  }
  handleUserSearch(e: any) {
    e.preventDefault();
    let userToFind = this.searchForm.get('userToFind')?.value;
    this.search=userToFind;

    this.SocialService.fetchSocialInfoSearch(userToFind).subscribe(
      (data: any) => {
        console.log(data);
        this.showsearch="showsearch";
        data.body.map((user: SocialUserModel) => {
          if(user.profilePicture == null||user.profilePicture == ""){
            user.profilePicture = "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
          }
          this.foundUserList.push(user);
        });
        // @ts-ignore
        document.getElementById('userContainer').style.display = 'none';
      },
      (err: any) => {
        console.log(err);
        this.showsearch="showsearch";
      }
    );

  }

  showDetailUser(username:string ){
    console.log(username)
    this.showDetailuser?.open(username);
  }
}
