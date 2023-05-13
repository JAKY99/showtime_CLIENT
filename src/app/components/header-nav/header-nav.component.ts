import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {faEllipsisVertical, faSearch, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {Confirmation, ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavComponent implements OnInit {

  public isMobileDevice: boolean = false;
  public isTabletDevice: boolean = false;
  public isDesktopDevice: boolean = false;

  faSearch = faSearch;
  faEllipsisVertical = faEllipsisVertical;
  faEllipsisV = faEllipsisV;
  items: MenuItem[] = [];

  @Input() displayAvatar: boolean = true;
  @Input() displayProfileMenu: boolean = false;
  @Input() logoShown: boolean = true;

  @Output() openEditProfile = new EventEmitter<any>();
  headerType: string | undefined = undefined;
  customHeader: string | undefined ="";

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    if (this.isDesktopDevice){
      this.logoShown = false;
    }

    if (this.displayProfileMenu){
      this.initProfileItems();
    }
    this.initItems();
  }

  initItems() {
    this.confirmationService.requireConfirmation$.subscribe((confirmation: Confirmation) => {
      this.customHeader = confirmation.message;
    });
    this.items.push(
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event) => {
          this.confirmationService.confirm({
            message: 'Are you sure that you want to logout?',
            accept: () => {
              this.tokenStorageService.logOut();
            }
          });
        }

      }
    );
  }

  initProfileItems() {
    this.items.push(
      {
        separator: true
      },
      {
        label: 'Edit Profile',
        icon: 'pi pi-user-edit',
        command: (event: Event) => {
          this.openEditProfile.emit();
        }

      }
    );
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}
