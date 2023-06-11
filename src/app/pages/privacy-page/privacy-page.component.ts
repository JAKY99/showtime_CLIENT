import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss']
})
export class PrivacyPageComponent implements OnInit {

  constructor(private userService : UserService,private tokenStorageService : TokenStorageService,private router: Router) { }
  termOfUseAgreementInformation : boolean = false;
  ngOnInit(): void {
    this.userService.getTermOfUseAgreementInformation().subscribe((res)=>{
      console.log(res)
      // @ts-ignore
        this.termOfUseAgreementInformation = res;
    },(error)=>{
      console.log("error")

    }
    );
  }

  accept() {
    this.userService.acceptTermOfUseAgreementInformation().subscribe((res)=>{
      this.router.navigate(['/home']).then(() => {
        return true
      });
      },(error)=>{
      this.router.navigate(['/login']).then(() => {
        this.tokenStorageService.logOut();
        return false
      });

      }
    );
  }

  refuse() {
    this.router.navigate(['/login']).then(() => {
      this.tokenStorageService.logOut();
      return false
    });
  }
}
