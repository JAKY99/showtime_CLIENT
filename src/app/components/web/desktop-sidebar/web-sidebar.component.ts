import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import { faClapperboard, faCompass, faTv, faUser, faUsers, faSignOut, faSearch } from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from "../../../services/token-storage.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-desktop-sidebar',
  templateUrl: './web-sidebar.component.html',
  styleUrls: ['./web-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebSidebarComponent implements OnInit {

  faClapperboard = faClapperboard;
  faCompass = faCompass;
  faTv = faTv;
  faUsers = faUsers;
  faUser = faUser;
  faSignOut = faSignOut;
  faSearch = faSearch;

  constructor(private router: Router, private TokenStorageService: TokenStorageService, private ConfirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  goToRoute(url: string){
    this.router.navigateByUrl(url).then();
  }

  getCurrentRoute(){
    return this.router.url;
  }

  getActiveClass(){
    return 'menu active-menu';
  }

  logout() {
    this.ConfirmationService.confirm({
      accept: () => {
        this.TokenStorageService.logOut();
      }
    });
  }

}
