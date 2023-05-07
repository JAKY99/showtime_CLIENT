import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ProfileService} from "../../../services/profile/profile.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-picture-crop-dialog',
  templateUrl: './picture-crop-dialog.component.html',
  styleUrls: ['./picture-crop-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PictureCropDialogComponent implements OnInit {

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  @Input() imgChangeEvt: any = '';
  cropImgPreview: any = '';
  fileToUpload: any = null;
  @Input() isAvatar: boolean = false;
  @Input() isBackground: boolean = false;
  isLoadingImg: boolean = true;
  isSaving: boolean = false;

  @Output() imageSaved = new EventEmitter<any>();

  constructor(private profileService :  ProfileService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  getAspectRatio(){
    if (this.isAvatar) {
      return 4 / 4;
    }else{
      return 4 / 3;
    }
  }

  upload() {
    this.isSaving = true;
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('email', this.tokenStorage.getClientUsername());

    if (this.isAvatar) {
      this.profileService.uploadAvatar(formData).subscribe((resp) => {
        this.close();
        this.imageSaved.emit();
        this.isSaving = false;
      })
    }else{
      this.profileService.uploadBackground(formData).subscribe((resp) => {
        this.close();
        this.imageSaved.emit();
        this.isSaving = false;
      })
    }
  }

  async cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    if (e.base64) {
      const base64Response = await fetch(e.base64);
      const blob = await base64Response.blob();
      this.fileToUpload = new File([blob], "name.jpg", {type: "image/jpg"});
    }
  }
  imgLoad() {
  }
  initCropper() {
    setTimeout(() => {
      this.isLoadingImg = false;
    }, 1000)
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  close(){
    this.viewedDialogShown = false;
  }

  open(){
    this.viewedDialogShown = true;
  }

}
