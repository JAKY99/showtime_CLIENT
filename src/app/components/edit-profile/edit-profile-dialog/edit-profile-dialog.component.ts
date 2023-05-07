import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";
import {ProfileService} from "../../../services/profile/profile.service";

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

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';
  isLoading: boolean = false;

  userData = {
    backgroundUrl: "",
    firstname: "",
    lastName: ""
  };

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    this.profileService.fetchProfileAvatar().subscribe((resp) => {
      //@ts-ignore
      this.userData.backgroundUrl = resp.body.backgroundPicture.length > 0 ? resp.body.backgroundPicture : "https://showtime-prod-bucket-storage.s3.us-east-2.amazonaws.com/781836.jpg";
      this.isLoading = false;
    });
  }

  close(){
    this.viewedDialogShown = false;
  }

  open(){
    this.viewedDialogShown = true;
    this.recommendedMediaChild?.fetchData();
  }

}
