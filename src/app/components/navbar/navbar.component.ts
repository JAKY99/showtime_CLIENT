import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {UserService} from "../../services/user/user.service";
import {ProfileService} from "../../services/profile/profile.service";
import {SlideToggleButtonService} from "../../services/slide-toggle-button/slide-toggle-button.service";

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
  newNotificationCounter: number = 0;
  loading: boolean = false;

  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;
  isNotificationActive: boolean = false;

  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private userservice : UserService,
              private profileService : ProfileService) { }

  ngOnInit(): void {
    this.userservice.userInformationUpdated.subscribe((data:any)=>{
      this.checkIfNotificationActive();
    })
    this.checkIfNotificationActive();
    this.connection();
    this.items = [
      {}
    ];
  }

  checkIfNotificationActive(){
    this.profileService.fetchProfileAvatar().subscribe((data:any)=>{

      this.isNotificationActive = data.body.notification_system_status;
    })
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
          if (localStorage.getItem('isAndroid') === 'true' && this.isNotificationActive) {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message, result.severity);
          }
          if (localStorage.getItem('isAndroid') !== 'true' && this.isNotificationActive) {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            // @ts-ignore
          }
          this.userservice.newNotificationEmitter();
        }
      });
      // @ts-ignore
      that.client.subscribe("/topic/usernotification/" + this.env, (message) => {
        if (message.body) {
          // that.loading = true
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true' && this.isNotificationActive) {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message, result.severity);
          }

          if (localStorage.getItem('isAndroid') !== 'true' && this.isNotificationActive) {

            this.addSingleToast('success', 'Notification', 'You have a new notification');
          }
          this.userservice.newNotificationEmitter();
        }
      });

      // @ts-ignore
      that.client.subscribe("/topic/user/ping/" + this.env, (message) => {
        if (message.body) {
          // that.loading = true
          let result = JSON.parse(message.body);
          this.userservice.ping(result.metrics_id).subscribe((res) => {
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
            this.userservice.newNotificationEmitter();
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            this.userservice.newNotificationEmitter();
            this.reloadWithoutCache();
          }
        }
      });

      // @ts-ignore
      that.client.subscribe(`/topic/trophy/${this.env}/${this.tokenStorage.getClientUsername()}`, (message) => {
        if (message.body) {
          // that.loading = true
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true' && this.isNotificationActive) {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message, result.severity);
          }

          if (localStorage.getItem('isAndroid') !== 'true' && this.isNotificationActive) {

            this.addSingleToast('success', 'Notification', 'You have a new notification');
          }
          this.userservice.newNotificationEmitter();
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
