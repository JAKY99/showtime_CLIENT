import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {NotificationsItem} from "../../models/common/notificationsItem";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-notification-feed-dialog',
  templateUrl: './notification-feed-dialog.component.html',
  styleUrls: ['./notification-feed-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationFeedDialogComponent implements OnInit {

  faChevronRight = faChevronRight;
  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'right';

  @Input() items: NotificationsItem[] = [];
  @Output() updateNotification = new EventEmitter<any>();

  hasNewNotifications: boolean = false;

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hasNewNotifications = this.items.filter(x => x.new).length > 0
    }, 500)
  }

  close(){
    this.viewedDialogShown = false;
  }

  open(){
    this.viewedDialogShown = true;
  }

  updateNotificationStatus() {
    this.UserService.updateNotificationStatus().subscribe(response => {
      this.hasNewNotifications = false;
      this.updateNotification.emit();
    });
    return true
  }

  getNotifDate(date: Date){
    const now = new Date();
    const notifDate = new Date(date);
    const difference = now.getTime() - notifDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

}
