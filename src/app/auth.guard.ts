import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./services/token-storage.service";
import {UserService} from "./services/user/user.service";
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GlobalConstants} from "./common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;


  constructor(private router: Router, private tokenStorage: TokenStorageService,private UserService : UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.connection();
    this.checkUpdate();


    if (!this.tokenStorage.isTokenExpired() ) {
      return true
    } else if (this.tokenStorage.isTokenExpired() && !this.tokenStorage.isRefreshTokenExpired()) {
      try {
        this.tokenStorage.refreshToken();
        return true
      } catch (e) {
        this.router.navigate(['/login']).then(() => {
          return false
        });
      }
    }
    this.router.navigate(['/login']).then(() => {
      return false
    });
  }

  checkUpdate(){
    console.log('check update')
    this.UserService.getCurrentVersion().subscribe(
      data => {
        let sessionVersion = sessionStorage.getItem('version');
        console.log(data)
        let currentVersion = data.body.version
        if(sessionVersion===null){
            sessionStorage.setItem('version',currentVersion);
        }
        if(sessionVersion !== currentVersion && sessionVersion !== null){
          sessionStorage.setItem('version',currentVersion);
          try{
            // @ts-ignore
            window['Android'].updateApp();
          }catch (e) {
            // @ts-ignore
            location.reload(true);
            console.log(e)
          }
        }
      },
        error => {
        console.log(error);
        },
      () => {
        console.log('check update complete')
      })
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
          if(message.body != 'New update'){
            // @ts-ignore
            window['Android'].createNotification('Showtime App',message.body);
          }
          if(message.body === 'New update'){
            // @ts-ignore
            window['Android'].updateApp();
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
}
