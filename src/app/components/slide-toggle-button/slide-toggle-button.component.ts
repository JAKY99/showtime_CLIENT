import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SlideToggleButtonService} from "../../services/slide-toggle-button/slide-toggle-button.service";
@Component({
  selector: 'app-slide-toggle-button',
  templateUrl: './slide-toggle-button.component.html',
  styleUrls: ['./slide-toggle-button.component.scss']
})
export class SlideToggleButtonComponent implements OnInit {
  @Input() isToggled: boolean = false;
  @Input() eventName: string = '';
  @Output() toggleChangedEmitter = new EventEmitter<boolean>();
  toggleId: string='';
  constructor(private slideToggleButtonService:SlideToggleButtonService) { }

  ngOnInit(): void {
    this.toggleId = this.generateUniqueId();
  }


  toggleChanged() {
    this.slideToggleButtonService.slideToggleEventEmitterService(this.eventName)
  }

  private generateUniqueId(): string {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 8;
    let generatedId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
      generatedId += alphanumericCharacters.charAt(randomIndex);
    }

    return generatedId;
  }
}
