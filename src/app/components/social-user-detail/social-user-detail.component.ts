import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {SocialService} from "../../services/social/social.service";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {TokenStorageService} from "../../services/token-storage.service";

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
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  faChevronDown = faChevronDown;
  faEllipsisVertical = faEllipsisVertical;
  constructor( private SocialService : SocialService,
               private confirmationService: ConfirmationService,
               private TokenStorageService: TokenStorageService,
               private changeDetector : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges): void {
    this.fetchSocialInfo();
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
        console.log(data);
        this.About = data.body.about==null?"No description yet":data.body.about;
        this.Comments = data.body.comments==null?"No comments yet":data.body.comments;
        this.Trophies = data.body.trophies==null?"No trophies yet":data.body.trophies;
        this.viewedDialogShown = true;
        this.changeDetector.detectChanges();
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("fetchSocialInfo");
  }
  open(username: string){
    this.username = username;
    console.log("open");
    this.fetchSocialInfo();

  }
  close(){
    this.viewedDialogShown = false
  }
}
