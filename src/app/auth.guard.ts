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
import {MessageService} from "primeng/api";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url = GlobalConstants.WEBSOCKET_URL
  env = GlobalConstants.ENV;
  private header: HttpHeaders | undefined;
  client: any;


  constructor(private router: Router, private tokenStorage: TokenStorageService,private UserService : UserService,private messageService: MessageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

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
      this.tokenStorage.logOut();
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
            // @ts-ignore
            location.reload(true);
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

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
