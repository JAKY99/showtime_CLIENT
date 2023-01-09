import { Component, OnInit } from '@angular/core';
import {TvDetails} from "../../models/tv/tv-details";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {MovieDetailsModel} from "../../models/movie/movie-details-model";
@Component({
  selector: 'app-profile-social-infos',
  templateUrl: './profile-social-infos.component.html',
  styleUrls: ['./profile-social-infos.component.scss']
})
export class ProfileSocialInfosComponent implements OnInit {
  public followingsCounter: number = 0;
  public followersCounter: number = 0;
  public commentsCounter: number = 0;
  constructor(private ProfileService :  ProfileService, private MovieService : MovieService) { }

  ngOnInit(): void {
    this.ProfileService.fetchProfileSocialInfos().subscribe((resp) => {
      //@ts-ignore
      this.followingsCounter = resp.body.followingsCounter;
      //@ts-ignore
      this.followersCounter = resp.body.followersCounter;
      //@ts-ignore
      this.commentsCounter = resp.body.commentsCounter;
    });

  }

}
