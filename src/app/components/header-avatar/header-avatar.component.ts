import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";

@Component({
  selector: 'app-header-avatar',
  templateUrl: './header-avatar.component.html',
  styleUrls: ['./header-avatar.component.scss']
})
export class HeaderAvatarComponent implements OnInit {

  profilePicture: string = "";
  isLoading: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchProfilePicture()
  }

  fetchProfilePicture(){
    this.isLoading = true
    this.profileService.fetchProfileAvatar().subscribe((resp) => {
      //@ts-ignore
      this.profilePicture = resp.body.profilePicture.length > 0
      //@ts-ignore
        ? resp.body.profilePicture
        : "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/revamped_showtime_icon.png";
      this.isLoading = false
    });
  }

}
