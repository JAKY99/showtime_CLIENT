import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./services/token-storage.service";
import {UserService} from "./services/user/user.service";
@Injectable({
  providedIn: 'root'
})
export class CheckupdateGuard implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService,private UserService : UserService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.checkUpdate()
    return true;
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
}
