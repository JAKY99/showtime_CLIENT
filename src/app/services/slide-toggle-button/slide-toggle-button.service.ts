import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideToggleButtonService {

  @Output() slideToggleEventEmitter = new EventEmitter<any>();
  constructor() { }


  slideToggleEventEmitterService(event: any) {
    this.slideToggleEventEmitter.emit(event);
  }
}
