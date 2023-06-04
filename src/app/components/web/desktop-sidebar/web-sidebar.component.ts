import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import { faClapperboard, faCompass, faTv, faUser, faUsers, faSignOut, faSearch } from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from "../../../services/token-storage.service";
import {ConfirmationService, MessageService} from "primeng/api";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {GlobalConstants} from "../../../common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";
import {NotificationIconComponent} from "../../notification-icon/notification-icon.component";
import {UserService} from "../../../services/user/user.service";

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

  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;
  constructor(private router: Router, private TokenStorageService: TokenStorageService, private ConfirmationService: ConfirmationService,private messageService: MessageService,private userService : UserService) { }

  ngOnInit(): void {
    this.connection();
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
      message: 'Are you sure you want to logout?',
      accept: () => {
        this.TokenStorageService.logOut();
      }
    });
  }
  connection() {
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;
    // @ts-ignore
    this.client.connect({}, () => {
      // @ts-ignore
      that.client.subscribe("/topic/usernotification/" + this.env + "/" + this.TokenStorageService.getClientUsername(), (message) => {
        if (message.body) {
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true') {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message);
            this.userService.newNotificationEmitter();
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            this.userService.newNotificationEmitter();
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
            this.userService.newNotificationEmitter();
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            this.userService.newNotificationEmitter();
          }
        }
      });

      // @ts-ignore
      that.client.subscribe("/topic/user/ping/" + this.env, (message) => {
        if (message.body) {
          let result = JSON.parse(message.body);
          this.userService.ping(result.metrics_id).subscribe((res) => {
          })
        }
      });

      // @ts-ignore
      that.client.subscribe("/topic/update/" + this.env, (message) => {
        if (message.body) {
          // that.loading = true
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true') {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message, result.severity);
            // @ts-ignore
            window['Android'].updateApp();
            this.userService.newNotificationEmitter();
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            this.userService.newNotificationEmitter();
            this.reloadWithoutCache();
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

  reloadWithoutCache=()=> {
    // Append a cache-busting parameter to the current URL
    const currentUrl = window.location.href;
    const cacheBuster = Date.now();
    const newUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'cache=' + cacheBuster;

    window.location.assign(newUrl);
    // @ts-ignore
    window.location.reload(true);
  }
}
