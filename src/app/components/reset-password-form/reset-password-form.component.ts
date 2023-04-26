import { Component, OnInit,Input } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {emailValidator} from "../../common/validators/emailValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientErrorsEnum} from "../../common/enums/http-status-codes/client-errors-enum";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  private header: HttpHeaders | undefined;
  public resetForm: UntypedFormGroup;
  public isLoading: boolean = false;
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private router: Router) {
    this.resetForm = new UntypedFormGroup({});
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']).then(r => r);
    }

    this.resetForm = new UntypedFormGroup({
      email: new UntypedFormControl('',[
        Validators.required,
        Validators.email,
        emailValidator(GlobalRegex.emailRegex)
      ])
    });

  }
  get email(){
    return this.resetForm.get('email')?.value;
  }

  submitReset(): void {
    this.isLoading = true;
    this.authService.reset(this.email).toPromise()
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
          case 200:
            this.addSingleToast(
              'success',
              'Reset password',
              'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.',
              true
            )
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



        this.isLoading = false;
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }
}
