import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {SocialService} from "../../services/social/social.service";
import {faUserPlus,faUserMinus} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-social-info-section',
  templateUrl: './social-info-section.component.html',
  styleUrls: ['./social-info-section.component.scss']
})
export class SocialInfoSectionComponent implements OnInit {

  public followingsCounter: number = 0;
  public followersCounter: number = 0;
  public commentsCounter: number = 0;
  public isFollowing : boolean = false;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;
  @Input() username: string = "";
  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private SocialService : SocialService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if(this.username == ""){
      return;
    }
    this.loadData();

  }
  loadData(){
    this.SocialService.fetchProfileSocialInfos(this.username).subscribe((resp) => {
      //@ts-ignore
      this.followingsCounter = resp.body.followingsCounter;
      //@ts-ignore
      this.followersCounter = resp.body.followersCounter;
      //@ts-ignore
      this.commentsCounter = resp.body.commentsCounter;
    });
    this.SocialService.fetchSocialInfosFollowingStatus(this.username).subscribe((resp) => {
      //@ts-ignore
      this.isFollowing = resp.body.following;
    });
  }
  followUser() {
    this.SocialService.actionFollowuser(this.username).subscribe((resp) => {
      this.loadData();
    });
  }

  unfollowUser() {
    this.SocialService.actionUnfollowuser(this.username).subscribe((resp) => {
      this.loadData();
    });
  }
}
