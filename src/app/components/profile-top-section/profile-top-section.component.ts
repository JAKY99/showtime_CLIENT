import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {ProfileService} from "../../services/profile/profile.service";
import {MovieService} from "../../services/movie/movie.service";
import {ProfileAvatarComponent} from "../profile-avatar/profile-avatar.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-profile-top-section',
  templateUrl: './profile-top-section.component.html',
  styleUrls: ['./profile-top-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileTopSectionComponent implements OnInit {

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  tabMenuItems: MenuItem[] = [];
  // @ts-ignore
  activeItem: MenuItem;

  @ViewChild('profileAvatarRef') profileAvatarChild: ProfileAvatarComponent | undefined;

  constructor(private ProfileService :  ProfileService,
              private MovieService : MovieService,
              private tokenStorage: TokenStorageService,
              private deviceService: DeviceDetectorService) { }
  public backgroundUrl : String = ""
  public fullName : String = ""
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    this.tabMenuItems = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    this.loadBackground();
  }
   openFileDialog=async()=>{
    // @ts-ignore
    document.getElementById('background-upload-input').click();
    // @ts-ignore
    window['Android']?.updateVariable(this.tokenStorage.getToken(),this.tokenStorage.getClientUsername(),"/api/v1/user/uploadBackgroundPicture")
  }

  loadBackground(){
    this.isLoading = true;
    this.ProfileService.fetchProfileAvatar().subscribe((resp) => {
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
