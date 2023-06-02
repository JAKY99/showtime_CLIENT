import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import { faClapperboard,faCompass,faTv, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons/faMicrophone";
import {TokenStorageService} from "../../services/token-storage.service";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";
import {NotificationFeedDialogComponent} from "../notification-feed-dialog/notification-feed-dialog.component";
import {NotificationIconComponent} from "../notification-icon/notification-icon.component";

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
  newNotification: boolean = false;
  newNotificationCounter: number = 0;
  loading: boolean = false;

  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;
  @ViewChild('notificationIconComponentsRef') notificationChild: NotificationIconComponent | undefined;
  constructor(private router: Router,private tokenStorage: TokenStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.connection();
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

  connection() {
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;
    // @ts-ignore
    this.client.connect({}, () => {
      // @ts-ignore
      that.client.subscribe("/topic/usernotification/" + this.env + "/" + this.tokenStorage.getClientUsername(), (message) => {
        if (message.body) {
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true') {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message);
            // @ts-ignore
            this.notificationChild?.fetchNotifications()
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            // @ts-ignore
            this.notificationChild?.fetchNotifications()
          }
        }
      });
      // @ts-ignore
      that.client.subscribe("/topic/usernotification/" + this.env, (message) => {
        if (message.body) {
          // that.loading = true
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true') {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message);
            // @ts-ignore
            this.notificationChild?.fetchNotifications()
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            // @ts-ignore
            this.notificationChild?.fetchNotifications()
          }
        }
      });
    }, this.onSocketfailure);
  }

  onSocketfailure = () => {
    setTimeout(() => {
      this.connection();
    }, 5000);
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
