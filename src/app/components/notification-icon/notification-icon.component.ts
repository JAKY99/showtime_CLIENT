import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import { Observable } from 'rxjs';
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user/user.service";
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss']
})
export class NotificationIconComponent implements OnInit {
  notificationItems:  MenuItem[] = [];
  faBell = faBell;
  newNotification: boolean =false;

  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;
  constructor(private tokenStorage: TokenStorageService,private UserService : UserService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.connection();
    this.fetchNotifications();
  }
  fetchNotifications(){
    this.UserService.getNotifications().subscribe(
      data => {
        // @ts-ignore
        let result = data.body;
        this.notificationItems = [];
        result.forEach((item: any) => {
          console.log(item)
          if(item.status === 'UNREAD'){
            this.newNotification = true;
          }
          this.notificationItems.push({
            label: item.message,
            icon: 'pi pi-fw pi-bell'
          })
        })
      },
      error => {
        this.addSingleToast('error','Error',error.error.message)
      }
    )
  }
  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;

    // @ts-ignore
    this.client.connect({}, ()=>{
      // @ts-ignore
      that.client.subscribe("/topic/usernotification/"+this.env+"/"+this.tokenStorage.getClientUsername(), (message) => {
        if(message.body) {
          let result = JSON.parse(message.body);

          if(localStorage.getItem('isAndroid') === 'true'){
            // @ts-ignore
            window['Android'].createNotification('Showtime App',result.message);
          }
          if(localStorage.getItem('isAndroid') !== 'true'){
            this.addSingleToast('success','Notification','You have a new notification');
            this.newNotification = true;
          }
        }
      });
    },this.onSocketfailure);
  }
  onSocketfailure=()=>{
    setTimeout(()=>{
      console.log('failure')
      this.connection();
    } , 5000);
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

  updateNotificationStatus() {
    console.log('update')
    this.UserService.updateNotificationStatus().subscribe(response=>{
      this.newNotification = false;
      this.fetchNotifications();
    });
    return true
  }
}
