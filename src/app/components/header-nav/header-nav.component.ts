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
import {ConfirmationService, MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavComponent implements OnInit {

  faSearch = faSearch;
  faEllipsisVertical = faEllipsisVertical;
  faEllipsisV = faEllipsisV;
  items: MenuItem[] = [];

  @Input() displayAvatar: boolean = true;
  @Input() displayProfileMenu: boolean = false;

  @Output() openEditProfile = new EventEmitter<any>();

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.displayProfileMenu){
      this.initProfileItems();
    }
    this.initItems();
  }

  initItems() {
    this.items.push(
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event) => {
          this.confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
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
