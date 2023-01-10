import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {TokenStorageService} from "../../services/token-storage.service";
@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit {

  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private tokenStorage: TokenStorageService) { }
  public avatarUrl : String = "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/art-g92118df33_1920.jpg"
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadAvatar();
  }
  openFileDialog=async ()=>{
    // @ts-ignore
    document.getElementById('avatar-upload-input').click();
    //@ts-ignore
    let upload =  window['Android']?.updateVariable(this.tokenStorage.getToken(),this.tokenStorage.getClientUsername(),"/api/v1/user/uploadProfilePicture")
    //@ts-ignore
    console.log(upload)
 }
 loadAvatar=()=>{
   this.ProfileService.fetchProfileAvatar().subscribe((resp) => {
     //@ts-ignore
     console.log(resp.body);
     //@ts-ignore
     this.avatarUrl = resp.body.profilePicture.length > 0 ? resp.body.profilePicture : "";
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
        this.avatarUrl = resp.newPictureUrl+"?"+  new Date().getTime();
        this.isLoading = false
      })
    } catch (e) {
      console.log(e);
      this.isLoading = false
      this.loadAvatar();
    }

  }
}
