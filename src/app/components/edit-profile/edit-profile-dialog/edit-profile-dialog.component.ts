import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";
import {ProfileService} from "../../../services/profile/profile.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileDialogComponent implements OnInit {

  @Input() profileData = {};

  @ViewChild('recommendedMediaRef') recommendedMediaChild: RecommendedMediaComponent | undefined;

  @Output() imageSaved = new EventEmitter<any>();
  @Output() accountInfosSaved = new EventEmitter<any>();

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  isLoading: boolean = false;

  userData = {
    backgroundUrl: "",
    firstName: "",
    lastName: "",
    isNotificationsActive: false,
  };
  about: string = "";
  constructor(private profileService: ProfileService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.profileService.fetchProfileAvatar().subscribe((resp) => {
      //@ts-ignore
      this.userData.backgroundUrl = resp.body.backgroundPicture.length > 0 ? resp.body.backgroundPicture : "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
      // @ts-ignore
      this.userData.firstName = resp.body.firstName;
      // @ts-ignore
      this.userData.lastName = resp.body.lastName;
      // @ts-ignore
      this.userData.isNotificationsActive = resp.body.notification_system_status;
    });
    this.profileService.fetchAbout().subscribe((resp) => {
      // @ts-ignore
      this.about =resp.aboutYou
    });
  }

  close(){
    this.viewedDialogShown = false;
  }

  open(){
    this.viewedDialogShown = true;
    this.recommendedMediaChild?.fetchData();
  }

  imageSavedSuccessFully(){
    this.loadData();
    this.imageSaved.emit();
    this.addSingleToast("success", "Image Saved Successfully", "")
  }

  accountInfosSavedSuccessFully(){
    this.loadData();
    this.accountInfosSaved.emit();
    this.addSingleToast("success", "Account Infos Saved Successfully", "")
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

}
