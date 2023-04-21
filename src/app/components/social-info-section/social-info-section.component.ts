import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {SocialService} from "../../services/social/social.service";
@Component({
  selector: 'app-social-info-section',
  templateUrl: './social-info-section.component.html',
  styleUrls: ['./social-info-section.component.scss']
})
export class SocialInfoSectionComponent implements OnInit {

  public followingsCounter: number = 0;
  public followersCounter: number = 0;
  public commentsCounter: number = 0;
  @Input() username: string = "";
  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private SocialService : SocialService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if(this.username == ""){
      return;
    }
    this.SocialService.fetchProfileSocialInfos(this.username).subscribe((resp) => {
      //@ts-ignore
      this.followingsCounter = resp.body.followingsCounter;
      //@ts-ignore
      this.followersCounter = resp.body.followersCounter;
      //@ts-ignore
      this.commentsCounter = resp.body.commentsCounter;
    });
  }

}
