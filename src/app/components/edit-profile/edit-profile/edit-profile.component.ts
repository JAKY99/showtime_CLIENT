import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";
import {PictureCropDialogComponent} from "../picture-crop-dialog/picture-crop-dialog.component";
import {ProfileService} from "../../../services/profile/profile.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../../common/validators/emailValidator";
import {GlobalRegex} from "../../../common/constants/global-regex";
import {UserAvatarModel} from "../../../models/user/user-avatar-model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {

  @ViewChild('pictureCropDialogRef') pictureCropDialogChild: PictureCropDialogComponent | undefined;

  @Input() userData = {
    backgroundUrl: "",
    firstName: "",
    lastName: ""
  };

  @Output() imageSaved = new EventEmitter<any>();
  @Output() accountInfosSaved = new EventEmitter<any>();

  imgChangeEvt: any = '';
  imageUrl: any = '';
  isAvatar: boolean = false;
  isBackground: boolean = false;
  private isClickedAvatar = false;
  private isClickedBackground = false;
  public editAccountInfosForm: FormGroup;
  isSavingInfosAccountForm: boolean = false;

  constructor(private profileService: ProfileService, private tokenStorage: TokenStorageService, private userService: UserService) {
    this.editAccountInfosForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.editAccountInfosForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', Validators.required)
    });

    this.editAccountInfosForm.patchValue({ firstName: this.userData.firstName, lastName: this.userData.lastName });
  }

  changeFile(event: any): void {
    this.imgChangeEvt = event;
    console.log(event)
    this.pictureCropDialogChild?.open();
  }

  openFileDialogAvatar = async (event: any, type: string) => {

    if (localStorage.getItem('isAndroid') == 'true' && !this.isClickedAvatar) {
      console.log("openFileDialogAvatar")
      this.isClickedAvatar = true;
      let url = "/api/v1/user/tempForCrop/uploadProfilePicture"
      // @ts-ignore
      window['Android']?.updateVariableForCrop(this.tokenStorage.getToken(), this.tokenStorage.getClientUsername(), url);
      setTimeout(() => {
        this.isClickedAvatar = false;
      }, 2000)
    }
  }
  openFileDialogBackground = async (event: any, type: string) => {
    if (localStorage.getItem('isAndroid') == 'true' && !this.isClickedBackground) {
      this.isClickedBackground = true;
      console.log("openFileDialogBackground")
      let url = "/api/v1/user/tempForCrop/uploadBackgroundPicture"
      // @ts-ignore
      window['Android']?.updateVariableForCrop(this.tokenStorage.getToken(), this.tokenStorage.getClientUsername(), url);
      setTimeout(() => {
        this.isClickedBackground = false;
      }, 2000)
    }
  }

  handleAndroidTempFile(event: any) {
    let type = event.target.value;
    console.log(event)
    console.log(type)
    if (localStorage.getItem('isAndroid') == 'true') {
      this.profileService.fetchTempFileUrl().subscribe((resp) => {
        console.log(resp)
        if (type === 'avatar') {
          // @ts-ignore
          this.imageUrl = resp.body.profilePicture
          this.isAvatar = true;
          this.isBackground = false;
        }
        if (type === 'background') {
          // @ts-ignore
          this.imageUrl = resp.body.backgroundPicture
          this.isAvatar = false;
          this.isBackground = true;
        }
        this.pictureCropDialogChild?.open();
        console.log(this.imageUrl)
      })
    }
  }

  submitEditInfosAccount() {
    this.isSavingInfosAccountForm = true;
    const userData: UserAvatarModel = {
      firstName: this.editAccountInfosForm.controls['firstName'].value,
      lastName: this.editAccountInfosForm.controls['lastName'].value,
    }

    this.userService.editAccountInfos(userData).subscribe(
      resp => {
        this.isSavingInfosAccountForm = false;
        this.accountInfosSaved.emit();
      },
      error => {
        this.isSavingInfosAccountForm = false;
      }
    );
  }
}
