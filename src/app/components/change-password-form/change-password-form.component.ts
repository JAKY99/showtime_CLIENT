import { Component, OnInit,Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {emailValidator} from "../../common/validators/emailValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientErrorsEnum} from "../../common/enums/http-status-codes/client-errors-enum";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  private header: HttpHeaders | undefined;
  public changePasswordForm: FormGroup;
  public isLoading: boolean = false;
  private isLoggedIn: boolean = false;
  public isLoginFailed: boolean = true;
  private token: string ="";
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.changePasswordForm = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']).then(r => r);

    }
    this.token = this.route.snapshot.params['token'];
    this.checkToken(this.token);
    this.changePasswordForm = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email,
        emailValidator(GlobalRegex.emailRegex)
      ]),
      password: new FormControl('', Validators.required),
      repeatpassword: new FormControl('', Validators.required)
    });
  }
  get email(){
    return this.changePasswordForm.get('email')?.value;
  }
  get password(){
    return this.changePasswordForm.get('password')?.value;
  }

  submitLogin(): void {
    this.isLoading = true;
    this.authService.changePassword(this.token,this.email, this.password).toPromise()
      .then(response => {
        this.header = response.headers;
        // @ts-ignore
        this.isLoading = false;
        switch (parseInt(response.body)) {
          case 403:
            this.addSingleToast(
              'error',
              'Reset password',
              'A reset password link has already been sent to your email address. Please check your email and follow the instructions.',
              true
            )
            break;
            case 401:
              this.addSingleToast(
                'error',
                'Reset password',
                'The link have already been used or is not valid.',
                true
              )
              break;
          case 200:
            this.addSingleToast(
              'success',
              'Reset password',
              'Your password has been successfully changed. You can now login with your new password.',
              true
            )
            setTimeout(() => {
              this.router.navigate(['/login']).then(r => r);
            }, 3000);
            break;
          default:
            this.addSingleToast(
              'error',
              'Reset password',
              'An error occurred while trying to reset your password. Please try again later.',
              true
            )
            break;
        }

      })
      .catch(err => {
        if (err.status === ClientErrorsEnum.ClientErrorForbidden){
          this.addSingleToast(
            'error',
            'Registration error',
            'Forbidden access',
            true
          )
        }
        if (err.status === ClientErrorsEnum.ClientErrorServerError){
          this.addSingleToast(
            'error',
            'Registration error',
            'The email already in use',
            true
          )
        }
        this.isLoading = false;
      });
  }
  check() {
    let repeatpassword = this.changePasswordForm.get('password')?.value == this.changePasswordForm.get('repeatpassword')?.value;
    this.isLoginFailed = !this.changePasswordForm.invalid && repeatpassword? false : true;
  }
  checkToken(token: string): void {
    this.authService.checkToken(this.token).toPromise()
      .then(response => {
        this.header = response.headers;
        // @ts-ignore
         if(response!==true){
          this.router.navigate(['/login']).then(r => r);
         }
      })
      .catch(err => {
        if (err.status === ClientErrorsEnum.ClientErrorForbidden){
          this.addSingleToast(
            'error',
            'Registration error',
            'Forbidden access',
            true
          )
        }
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }
}
