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
import {SlideToggleButtonService} from "../../../services/slide-toggle-button/slide-toggle-button.service";
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
    lastName: "",
    isNotificationsActive: false,
  };
  @Input() about: string = "";
  @Output() imageSaved = new EventEmitter<any>();
  @Output() accountInfosSaved = new EventEmitter<any>();

  imgChangeEvt: any = '';
  imageUrl: any = '';
  isAvatar: boolean = false;
  isBackground: boolean = false;
  private isClickedAvatar = false;
  private isClickedBackground = false;
  public editAccountInfosForm: FormGroup;
  public editAccountPasswordForm: FormGroup;
  public editAccountInfosAboutYouForm: FormGroup;
  isSavingInfosAccountForm: boolean = false;
  isSavingInfosPasswordAccountForm: boolean = false;
  isSavingInfosAboutYouForm : boolean = false;
  isRepeatNok: boolean = true ;
  public isLoginFailed: boolean = true;
  SYSTEM_NOTIFICATION: string = 'SYSTEM_NOTIFICATION';
  constructor(private profileService: ProfileService, private tokenStorage: TokenStorageService, private userService: UserService, private slideToggleButtonService: SlideToggleButtonService) {
    this.editAccountInfosForm = new FormGroup({})
    this.editAccountPasswordForm = new FormGroup({})
    this.editAccountInfosAboutYouForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.slideToggleButtonService.slideToggleEventEmitter.subscribe((data: any) => {
      if (data == 'SYSTEM_NOTIFICATION') {
        this.userData.isNotificationsActive = !this.userData.isNotificationsActive;
        this.userService.editAccountInfos(this.userData).subscribe(
          resp => {
            this.userService.userInformationUpdated.emit();
            this.accountInfosSaved.emit();
          },
          error => {
            this.isSavingInfosAccountForm = false;
          }
        );
      }
    });
    this.editAccountInfosForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', Validators.required)
    });
    this.editAccountInfosAboutYouForm = new FormGroup({
      aboutYou: new FormControl('', [
        Validators.required,
      ]),
    });
    this.editAccountInfosForm.patchValue({ firstName: this.userData.firstName, lastName: this.userData.lastName });
    this.editAccountInfosAboutYouForm.patchValue({ aboutYou: this.about });
// Define a regular expression for the password format
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()/]).{8,}$/;
    this.editAccountPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX)
      ]),
      repeatpassword: new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX),
      ])
    });
  }

  changeFile(event: any): void {
    this.imgChangeEvt = event;
    this.pictureCropDialogChild?.open();
  }

  openFileDialogAvatar = async (event: any, type: string) => {

    if (localStorage.getItem('isAndroid') == 'true' && !this.isClickedAvatar) {

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

    if (localStorage.getItem('isAndroid') == 'true') {
      this.profileService.fetchTempFileUrl().subscribe((resp) => {
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

      })
    }
  }

  submitEditInfosAccount() {
    this.isSavingInfosAccountForm = true;
    const userData: UserAvatarModel = {
      firstName: this.editAccountInfosForm.controls['firstName'].value,
      lastName: this.editAccountInfosForm.controls['lastName'].value,
      isNotificationsActive: this.userData.isNotificationsActive,
    }

    this.userService.editAccountInfos(userData).subscribe(
      resp => {
        this.isSavingInfosAccountForm = false;
        this.accountInfosSaved.emit();
        this.userService.userInformationUpdated.emit();
      },
      error => {
        this.isSavingInfosAccountForm = false;
      }
    );
  }

  submitEditPasswordAccount() {
    const userData = {
      newPassword: this.editAccountPasswordForm.controls['password'].value
    }
   this.userService.editAccountPasswordInfos(userData).subscribe(
     resp => {
        this.isSavingInfosPasswordAccountForm = resp.body;
        this.accountInfosSaved.emit();
       this.editAccountPasswordForm.controls['password'].setValue('');
        this.editAccountPasswordForm.controls['repeatpassword'].setValue('');
     })
  }
  check() {
    let repeatpassword = this.editAccountPasswordForm.get('password')?.value == this.editAccountPasswordForm.get('repeatpassword')?.value;
    this.isRepeatNok=!repeatpassword
    this.isLoginFailed = !this.editAccountPasswordForm.invalid && repeatpassword? false : true;
  }

  submitEditInfosAccountAboutYou() {
    this.isSavingInfosAboutYouForm = true;

    this.userService.editAccountInfosAboutYou(this.editAccountInfosAboutYouForm.controls['aboutYou'].value).subscribe(
      resp => {
        this.isSavingInfosAboutYouForm = false;
        this.accountInfosSaved.emit();
        this.userService.userInformationUpdated.emit();
      },
      error => {
        this.isSavingInfosAboutYouForm = false;
      }
    );
  }
}
