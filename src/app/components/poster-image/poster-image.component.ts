import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-poster-image',
  templateUrl: './poster-image.component.html',
  styleUrls: ['./poster-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PosterImageComponent implements OnInit {

  constructor() { }

  @Input() borderRadius: boolean = true;
  @Input() originalSize: boolean = false;

  @Input() item: {
    name: string;
    title: string;
    poster_path: string;
  } = {
    name: '',
    title: '',
    poster_path: ''
  };

  imageState: string = "setup";

  ngOnInit(): void {
  }

  getImageSize(){
    if (this.originalSize){
      return "original"
    }
    return "300"
  }

  imageStateChange($event: string) {
    this.imageState = $event;
  }

  isImageLoaded(){
    return this.imageState === 'finally';
  }
}
