import {Component, HostListener, Inject, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {faEllipsisVertical, faSearch} from '@fortawesome/free-solid-svg-icons';
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
  items: MenuItem[] = [];

  @Input() displayAvatar: boolean = true;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initItems();
  }

  initItems() {
    this.items = [
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
    ];
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
