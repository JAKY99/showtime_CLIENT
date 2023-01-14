import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";
import { faClapperboard,faCompass,faTv, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons/faMicrophone";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  faClapperboard = faClapperboard;
  faCompass = faCompass;
  faTv = faTv;
  faUsers = faUsers;
  faUser = faUser;

  faVocal = faMicrophone

  items: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {}
    ];
  }

  getCurrentRoute(){
    return this.router.url;
  }

  getActiveClass(){
    return 'nav-button activeMenu';
  }

  goToRoute(url: string){
    this.router.navigateByUrl(url).then();
  }

  toggleVocalSearch() {
    document.getElementById('navbar-vocal-btn')?.classList.toggle('navbar-vocal-btn-pulse');
    // @ts-ignore
    window['Android']?.toggleVocalSearch();
  }

  checkAndroid() {
    return localStorage.getItem('isAndroid') === 'true';
  }
}
