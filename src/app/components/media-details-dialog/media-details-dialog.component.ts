import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronDown, faClose} from "@fortawesome/free-solid-svg-icons";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-media-details-dialog',
  templateUrl: './media-details-dialog.component.html',
  styleUrls: ['./media-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaDetailsDialogComponent implements OnInit {

  closeIcon = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';

  requestedMovieId: number = 0;
  requestedTvId: number = 0;

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    if (this.isDesktopDevice) {
      this.viewedDialogPosition = 'center'
      this.closeIcon = faClose;
    }
  }

  close(){
    this.viewedDialogShown = false
    this.requestedMovieId = 0;
    this.requestedTvId = 0;
  }

  open(media: any){
    if (media.original_name){
      this.requestedTvId = media.id;
    }else{
      this.requestedMovieId = media.id;
    }
    this.viewedDialogShown = true;
  }

}
