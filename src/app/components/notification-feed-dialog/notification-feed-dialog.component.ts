import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {faChevronRight, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {NotificationsItem} from "../../models/common/notificationsItem";
import {UserService} from "../../services/user/user.service";
import {ConfirmationService, MenuItem, PrimeIcons} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {SlideMenu} from "primeng/slidemenu";

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
  faEllipsisV = faEllipsisV;
  itemsNotification: MenuItem[] = [];
  @Input() items: NotificationsItem[] = [];
  @Input() displayProfileMenu: boolean = true;
  @Output() updateNotification = new EventEmitter<any>();
  @ViewChild('profileMenuNotification') profileMenuNotifications: SlideMenu[] = [];
  hasNewNotifications: boolean = false;
  selectedNotification: NotificationsItem | undefined;
  constructor(private UserService: UserService,
              private confirmationService: ConfirmationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hasNewNotifications = this.items.filter(x => x.new).length > 0
    }, 500)
    this.UserService.newNotificationSignal.subscribe((data:any)=>{
      this.hasNewNotifications = true;
    })
    this.itemsNotification.push(
      {
        separator: true
      },
      {
        label: 'Delete',
        icon: PrimeIcons.TRASH,
        command: (event: Event) => {
          console.log(this.selectedNotification)
          this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this notification?',
            accept: (event: Event) => {
              this.deleteNotification(this.selectedNotification?.id);
            }
          });
        }

      },
      {
        separator: true
      },
      {
        label: 'Mark as read',
        icon: PrimeIcons.EYE_SLASH,
        command: (event: Event) => {
          this.markAsRead(this.selectedNotification?.id);
        }

      }
    );
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


  // Use ViewChild to access the p-slideMenu instances


  handleProfileMenuNotification(event: MouseEvent, menuId: string) {

    // @ts-ignore
    const profileMenu = this[`${menuId}]`];
    console.log(profileMenu)
    // Perform actions for the specific p-slideMenu identified by menuId
    // profileMenu.toggle(event); // Example action: toggle the menu visibility
  }

  updateSelectedNotification(item: NotificationsItem) {
    this.selectedNotification = item;
    if(item.new){
      this.itemsNotification = [];
      this.itemsNotification.push(
        {
          separator: true
        },
        {
          label: 'Delete',
          icon: PrimeIcons.TRASH,
          command: (event: Event) => {
            console.log(this.selectedNotification)
            this.confirmationService.confirm({
              message: 'Are you sure that you want to delete this notification?',
              accept: (event: Event) => {
                this.deleteNotification(this.selectedNotification?.id);
              }
            });
          }

        },
        {
          separator: true
        },
        {
          label: 'Mark as read',
          icon: PrimeIcons.EYE_SLASH,
          command: (event: Event) => {
            this.markAsRead(this.selectedNotification?.id);
          }

        }
      );
    }
    if(!item.new){
      this.itemsNotification = [];
      this.itemsNotification.push(
        {
          separator: true
        },
        {
          label: 'Delete',
          icon: PrimeIcons.TRASH,
          command: (event: Event) => {
            console.log(this.selectedNotification)
            this.confirmationService.confirm({
              message: 'Are you sure that you want to delete this notification?',
              accept: (event: Event) => {
                this.deleteNotification(this.selectedNotification?.id);
              }
            });
          }

        },
      );
    }
  }

  deleteNotification(id: number | undefined) {
    this.UserService.deleteNotification(id).subscribe(response => {
      this.updateNotification.emit();
    });
  }
  markAsRead(id: number | undefined) {
    this.UserService.markAsReadNotification(id).subscribe(response => {
      this.updateNotification.emit();
    });
  }
}
