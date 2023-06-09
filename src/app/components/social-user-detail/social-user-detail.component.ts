import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {SocialService} from "../../services/social/social.service";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {TokenStorageService} from "../../services/token-storage.service";
import {CommentService} from "../../services/comment/comment.service";

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
  constructor( private SocialService : SocialService,
               private confirmationService: ConfirmationService,
               private TokenStorageService: TokenStorageService,
               private changeDetector : ChangeDetectorRef,
                private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.fetchUserComments();
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
    this.fetchUserComments();

  }
  close(){
    this.viewedDialogShown = false
  }
  fetchUserComments() {
    console.log(this.username)
    this.commentService.fetchUserAllComments(this.username).subscribe((resp) => {
      this.resultUserComments = resp;
      console.log(this.resultUserComments.length)
    }, (error) => {
      console.log(error);
    })
  }
}
