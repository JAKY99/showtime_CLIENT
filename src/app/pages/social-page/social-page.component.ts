import { Component, OnInit } from '@angular/core';
import {SocialService} from "../../services/social/social.service";

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss']
})
export class SocialPageComponent implements OnInit {

  About : string = ""
  Comments : string = ""
  Trophies : string = ""
  constructor(private SocialService : SocialService) { }

  ngOnInit(): void {
  this.fetchSocialInfo();
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
