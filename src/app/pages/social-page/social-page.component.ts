import { Component, OnInit } from '@angular/core';
import {SocialService} from "../../services/social/social.service";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss']
})
export class SocialPageComponent implements OnInit {

  About : string = ""
  Comments : string = ""
  Trophies : string = ""
  items: MenuItem[]=[];
  faEllipsisVertical = faEllipsisVertical;
  constructor(
    private SocialService : SocialService,
    private confirmationService: ConfirmationService,
    private TokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
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
     this.SocialService.fetchSocialInfo().subscribe(
      (data: any) => {
        console.log(data);
        this.About = data.body.about==null?"No description yet":data.body.about;
        this.Comments = data.body.comments==null?"No comments yet":data.body.comments;
        this.Trophies = data.body.trophies==null?"No trophies yet":data.body.trophies;
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("fetchSocialInfo");
  }
}
