import { Component, OnInit,Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {emailValidator} from "../../common/validators/emailValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientErrorsEnum} from "../../common/enums/http-status-codes/client-errors-enum";
import { ActivatedRoute } from '@angular/router';
import {GlobalConstants} from "../../common/constants/global-constants";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() changeFormType: any;
  private header: HttpHeaders | undefined;
  public loginForm: FormGroup;
  public isLoading: boolean = false;
  private isLoggedIn: boolean = false;
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Access query parameters using params object
      if(params['token']!==undefined){
        const token = params['token'];
        this.tokenStorage.saveToken(token);
        this.router.navigate(['/home']).then();
      }


    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']).then(r => r);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email,
        emailValidator(GlobalRegex.emailRegex)
      ]),
      password: new FormControl('', Validators.required)
    });
    this.handleListener();
  }

  get email(){
    return this.loginForm.get('email')?.value;
  }
  get password(){
    return this.loginForm.get('password')?.value;
  }
  submitLogin(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).toPromise()
      .then(response => {
        this.header = response.headers;
        // @ts-ignore
        this.tokenStorage.saveToken(this.header.get('Authorization'));

        this.router.navigate(['/home']).then();
        this.isLoading = false;
      })
      .catch(err => {
        if (err.status === ClientErrorsEnum.ClientErrorForbidden){
          this.addSingleToast(
            'error',
            'Authentication error',
            'The email or password you entered is incorrect',
            true
          )
        }
        this.isLoading = false;
      });
  }
  reloadPage(): void {
    window.location.reload();
  }

  handleGoogleLogin=(event: any,parent: any)=>{
    this.authService.googleLogin(event.detail.credential).toPromise()     .then(response => {
      if(response.email=="ERROR"){
        this.addSingleToast(
          'error',
          'Authentication error',
          'The email or password you entered is incorrect',
          true
        )
      }
      if(response.email!=="ERROR"){
        this.header = response.headers;
        // @ts-ignore
        this.tokenStorage.saveToken(this.header.get('Authorization'));

        this.router.navigate(['/home']).then();
        this.isLoading = false;
      }

    })
      .catch(err => {
        if (err.status === ClientErrorsEnum.ClientErrorForbidden){
          this.addSingleToast(
            'error',
            'Authentication error',
            'The email or password you entered is incorrect',
            true
          )
        }
        this.isLoading = false;
      });
  }
  baseUrl = window.location.origin+"/login";
  handleListener(){
    let parent = this;
    // @ts-ignore
    window.addEventListener('google_sign_in', ()=>this.handleGoogleLogin(event,parent))
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

  getLoginUri() {
    let url = GlobalConstants.GOOGLE_LOGIN_URI;
    return url;
  }
}
