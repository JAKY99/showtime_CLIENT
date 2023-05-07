import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {RecommendedMediaComponent} from "../../recommended-media/recommended-media.component";
import {PictureCropDialogComponent} from "../picture-crop-dialog/picture-crop-dialog.component";

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
  isAvatar: boolean = false;
  isBackground: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeFile(event: any): void {
    this.imgChangeEvt = event;
    console.log(event)
    this.pictureCropDialogChild?.open();
  }
}
