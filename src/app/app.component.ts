import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, public router: Router, private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.primengConfig.ripple = false;
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  title = 'Showtime';

  isNavbarMobileShown() {
    return (this.isMobileDevice || this.isTabletDevice) && (this.router.url.includes('/movies') ||
      this.router.url.includes('/home') ||
      this.router.url.includes('/series') ||
      this.router.url.includes('/social') ||
      this.router.url.includes('/profil'));
  }

  isNavbarDesktopShown() {
    return this.isDesktopDevice && (this.router.url.includes('/movies') ||
      this.router.url.includes('/home') ||
      this.router.url.includes('/series') ||
      this.router.url.includes('/social') ||
      this.router.url.includes('/search') ||
      this.router.url.includes('/profil'));
  }
}
