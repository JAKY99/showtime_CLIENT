import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  blockedDocument: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, public router: Router) {
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  title = 'Showtime';

  toggleBlockDocument(){
    this.blockedDocument = !this.blockedDocument;
  }

  isNavbarShown(){
    return this.router.url.includes('/movies') ||
      this.router.url.includes('/home') ||
      this.router.url.includes('/series') ||
      this.router.url.includes('/social') ||
      this.router.url.includes('/profil');
  }
}
