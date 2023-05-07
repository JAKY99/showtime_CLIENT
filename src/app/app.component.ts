import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig, public router: Router) {
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  title = 'Showtime';

  isNavbarShown(){
    return this.router.url.includes('/movies') ||
      this.router.url.includes('/home') ||
      this.router.url.includes('/series') ||
      this.router.url.includes('/social') ||
      this.router.url.includes('/profil');
  }
}
