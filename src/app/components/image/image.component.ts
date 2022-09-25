import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  constructor() { }

  globalConstants = GlobalConstants;

  //TODO add default image path
  @Input() imagePath: string | null = "";
  @Input() imageTitle: string | null = "";
  @Input() imageSize: string = "300";
  @Input() icon: IconProp | undefined;

  ngOnInit(): void {
  }

  getImageSize(){
    if (this.imageSize){
      if (this.imageSize.includes("original")){
        return "/original/"
      }else{
        return "/w" + this.imageSize + "/"
      }
    }
    return null;
  }

}
