import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";
import {PictureCropDialogComponent} from "../picture-crop-dialog/picture-crop-dialog.component";
import {ProfileService} from "../../../services/profile/profile.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {

  @ViewChild('pictureCropDialogRef') pictureCropDialogChild: PictureCropDialogComponent | undefined;

  @Input() userData = {
    backgroundUrl: ""
  };

  @Output() imageSaved = new EventEmitter<any>();

  imgChangeEvt: any = '';
  imageUrl: any = '';
  isAvatar: boolean = false;
  isBackground: boolean = false;

  constructor(private profileService : ProfileService,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  changeFile(event: any): void {
    this.imgChangeEvt = event;
    console.log(event)
    this.pictureCropDialogChild?.open();
  }
  openFileDialog=async(type:string)=>{
    if(localStorage.getItem('isAndroid') == 'true'){
      let url;
      if (type === 'avatar') {
        url="/api/v1/user/tempForCrop/uploadBackgroundPicture"
      }
      if (type === 'background') {
        url="/api/v1/user/tempForCrop/uploadProfilePicture"
      }
      // @ts-ignore
      window['Android']?.updateVariableForCrop(this.tokenStorage.getToken(),this.tokenStorage.getClientUsername(),url);
    }
  }
  handleAndroidTempFile(event:any){
    let type  = event.target.value;
    if(localStorage.getItem('isAndroid') == 'true'){
      this.profileService.fetchTempFileUrl(type).subscribe((resp)=>{
        // @ts-ignore
        this.imageUrl = resp.data;
      })
      if (type === 'avatar') {
        this.isAvatar = true;
        this.isBackground = false;
      }else{
        this.isAvatar = false;
        this.isBackground = true;
      }
    }
  }
}
