import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user/user.service";
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";
import {RecommendedMediaComponent} from "../recommended-media/recommended-media.component";
import {NotificationFeedDialogComponent} from "../notification-feed-dialog/notification-feed-dialog.component";
import {NotificationsItem} from "../../models/common/notificationsItem";

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationIconComponent implements OnInit {
  notificationItems: NotificationsItem[] = [];
  faBell = faBell;
  newNotification: boolean = false;
  newNotificationCounter: number = 0;
  loading: boolean = false;

  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;

  @ViewChild('notificationFeedRef') notificationFeedChild: NotificationFeedDialogComponent | undefined;

  constructor(private tokenStorage: TokenStorageService, private UserService: UserService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.connection();
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.UserService.getNotifications().subscribe(
      data => {
        // @ts-ignore
        let result: [{ status: string }] = data.body;
        this.notificationItems = [];
        result.forEach((item: any) => {
          if (item.status === 'UNREAD') {
            this.newNotification = true;
          }
          this.notificationItems.push({
            label: item.message,
            icon: 'pi pi-fw pi-bell',
            new: item.status === 'UNREAD',
            dateCreated: new Date(item.dateCreated)
          })
        })
        this.newNotificationCounter = result.filter(x => x.status === "UNREAD").length
        this.notificationItems.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
      },
      error => {
        this.addSingleToast('error', 'Error', error.error.message)
      }
    )
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
          that.loading = true
          let result = JSON.parse(message.body);
          if (localStorage.getItem('isAndroid') === 'true') {
            // @ts-ignore
            window['Android'].createNotification('Showtime App', result.message);
            this.newNotification = true;
            // @ts-ignore
            this.fetchNotifications();
          }
          if (localStorage.getItem('isAndroid') !== 'true') {
            this.addSingleToast('success', 'Notification', 'You have a new notification');
            this.newNotification = true;
            // @ts-ignore
            this.fetchNotifications();
          }
          setTimeout(() => {
            this.loading = false
          }, 500)
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

  updateNotificationStatus() {
    this.newNotification = false;
    this.notificationItems.map(x => {
      if (x.new) {
        x.new = false;
      }
    });
    // @ts-ignore
    this.newNotificationCounter = this.notificationItems.filter(x => x.status === "UNREAD").length
    return true
  }

  openNotificationFeedDialog() {
    this.notificationFeedChild?.open();
  }
}
