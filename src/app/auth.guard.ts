import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./services/token-storage.service";
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GlobalConstants} from "./common/constants/global-constants";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  client: any;
  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.connection();
    if (!this.tokenStorage.isTokenExpired()){
      return true
    }
    this.router.navigate(['/login']).then(() => {
      return false
    });
  }
  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;

    // @ts-ignore
    this.client.connect({}, ()=>{
      // @ts-ignore
      that.client.subscribe("/topic/user/"+this.env, (message) => {
        if(message.body) {
          // @ts-ignore
          window['Android'].createNotification('Showtime App',message.body);
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
}
