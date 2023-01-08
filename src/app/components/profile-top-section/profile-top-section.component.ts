import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";

@Component({
  selector: 'app-profile-top-section',
  templateUrl: './profile-top-section.component.html',
  styleUrls: ['./profile-top-section.component.scss']
})
export class ProfileTopSectionComponent implements OnInit {

  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private tokenStorage: TokenStorageService) { }
  public backgroundUrl : String = ""
  public fullName : String = ""
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loadBackground();
  }
  openFileDialog=()=>{
    // @ts-ignore
    document.getElementById('background-upload-input').value="";
    // @ts-ignore
    document.getElementById('background-upload-input').click();


  }
  loadBackground=()=>{
    this.isLoading = true;
    this.ProfileService.fetchProfileAvatar().subscribe((resp) => {
      this.backgroundUrl ="";
      //@ts-ignore
      this.backgroundUrl = resp.body.backgroundPicture.length > 0 ? resp.body.backgroundPicture +"?"+  new Date().getTime() : "https://wallpaperaccess.com/full/781822.jpg";
      //@ts-ignore
      this.fullName = resp.body.fullName;
    });
  }
  onFileChange(event : any) {
    try {
      this.isLoading = true;
      let file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', this.tokenStorage.getClientUsername());
      this.ProfileService.uploadBackground(formData).subscribe((resp) => {
        // @ts-ignore
        this.loadBackground();

      })
    } catch (e) {
      console.log(e);
      this.isLoading = false
      this.loadBackground();
    }

  }

}
