import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {RedisService} from "../../services/redis/redis.service";
@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit {

  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private tokenStorage: TokenStorageService,private RedisService: RedisService) { }
  public avatarUrl : string = ""
  isLoading: boolean = true;
  avatarOriginUrl : string = ""
  ngOnInit(): void {
    this.loadAvatar();

  }
  openFileDialog=async ()=>{
    // @ts-ignore
    document.getElementById('avatar-upload-input').click();
    //@ts-ignore
    window['Android']?.updateVariable(this.tokenStorage.getToken(),this.tokenStorage.getClientUsername(),"/api/v1/user/uploadProfilePicture")

 }
 loadAvatar=()=>{
   this.ProfileService.fetchProfileAvatar().subscribe((resp) => {
       //@ts-ignore
       this.avatarUrl = resp.body.profilePicture.length > 0 ? resp.body.profilePicture : "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/revamped_showtime_icon.png";

     //@ts-ignore
     this.isLoading = false
   });
 }
  onFileChange(event : any) {
    try {
      this.isLoading = true;
      let file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', this.tokenStorage.getClientUsername());
      this.ProfileService.uploadAvatar(formData).subscribe((resp) => {
        // @ts-ignore
        this.loadAvatar()
      })
    } catch (e) {
      console.log(e);
      this.isLoading = false
      this.loadAvatar();
    }

  }

  onFileChangeAndroid=()=>{
    this.isLoading=true
    setTimeout(()=>{
      this.loadAvatar()
    },2000)

  }
}
