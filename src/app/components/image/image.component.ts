import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {StateChange} from "ng-lazyload-image";
import {RedisService} from "../../services/redis/redis.service";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  constructor(private RedisService: RedisService){}

  globalConstants = GlobalConstants;

  @Input() isLazy: boolean = true;
  @Input() imagePath: string | null = "";
  @Input() imageTitle: string | null = "";
  @Input() imageSize: string = "300";
  @Input() icon: IconProp | undefined;
  @Input() lazyLoading: boolean = true;
  @Input() container: boolean = true;
  imagePathUrl : string = ""
  @Output() imgStateEvent = new EventEmitter<string>();

  lazyFinished: boolean = false;

  ngOnInit(): void {
    // let url = this.globalConstants.TMDB_IMAGE_BASE_URL + this.getImageSize() + this.imagePath
    // this.getImageFromCache(url)
  }

  getImageSize(){
    if (this.imageSize){
      if (this.imageSize.includes("original")){
        return "/original/"
      }else{
        return "/w" + this.imageSize
      }
    }
    return null;
  }

  imgStateChange(event: StateChange){
    this.imgStateEvent.emit(event.reason);
    switch (event.reason) {
      case 'setup':
        // The lib has been instantiated but we have not done anything yet.
        break;
      case 'observer-emit':
        // The image observer (intersection/scroll/custom observer) has emit a value so we
        // should check if the image is in the viewport.
        // `event.data` is the event in this case.
        break;
      case 'start-loading':
        // The image is in the viewport so the image will start loading
        break;
      case 'mount-image':
        // The image has been loaded successfully so lets put it into the DOM
        break;
      case 'loading-succeeded':
        // The image has successfully been loaded and placed into the DOM
        break;
      case 'loading-failed':
        // The image could not be loaded for some reason.
        // `event.data` is the error in this case
        break;
      case 'finally':
        this.lazyFinished = true;
        // The last event before cleaning up
        break;
    }

  }
getImageFromCache(url: string){
    this.RedisService.getImageFromRedisCache(url).subscribe(
      data => {
        this.imagePathUrl = data.urlApi;
      },
      error => {
        console.log(error);
      });
  }
}
