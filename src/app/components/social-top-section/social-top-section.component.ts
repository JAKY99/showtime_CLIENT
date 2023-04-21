import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {SocialService} from "../../services/social/social.service";

@Component({
  selector: 'app-social-top-section',
  templateUrl: './social-top-section.component.html',
  styleUrls: ['./social-top-section.component.scss']
})
export class SocialTopSectionComponent implements OnInit {

  constructor(private ProfileService :  ProfileService, private MovieService : MovieService,private tokenStorage: TokenStorageService,private SocialService :SocialService) { }
  public backgroundUrl : String = ""
  public fullName : String = ""
  isLoading: boolean = false;
  @Input() isOwner: boolean = true;
  @Input() username: string = "";
  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges): void {
    this.loadBackground();
  }
  loadBackground=()=>{
    if(this.username == ""){
      return;
    }
    this.isLoading = true;
    this.SocialService.fetchProfileAvatar(this.username).subscribe((resp) => {

      //@ts-ignore
      this.backgroundUrl = resp.body.backgroundPicture.length > 0 ? resp.body.backgroundPicture : "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
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
  onFileChangeAndroid=()=>{
    this.isLoading = true
    setTimeout(()=>{
      this.loadBackground();
    },2000)

  }
}
