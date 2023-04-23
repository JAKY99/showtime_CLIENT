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
              private refreshTokenStorage: TokenStorageService,
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
      if(params['authGoogleError']!==undefined){
        this.addSingleToast(
          'error',
          'Authentication error',
          'Your Google Signin failed , please try again',
          true
        )
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
    this.loadGoogleSignInScript();
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
        // @ts-ignore
        this.refreshTokenStorage.saveRefreshToken(this.header.get('Refresh'));

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

  insertGoogleLoginButton() {
    this.loadGoogleSignInScript();
    console.log('test')
    // Delete old element if exists
    document.getElementById('g_id_onload')?.remove();
    document.getElementsByClassName('g_id_signin')?.item(0)?.remove();

    const gIdOnloadDiv = document.createElement('div');
    gIdOnloadDiv.id = 'g_id_onload';
    gIdOnloadDiv.setAttribute('data-client_id', '108918265204-8vlnr2kh2bc0t872mp67k8qu9k2t9t59.apps.googleusercontent.com');
    gIdOnloadDiv.setAttribute('data-context', 'signin');
    gIdOnloadDiv.setAttribute('data-ux_mode', 'redirect');
    gIdOnloadDiv.setAttribute('data-login_uri', this.getLoginUri());
    gIdOnloadDiv.setAttribute('data-callback', 'handleLoginGoogle');
    gIdOnloadDiv.setAttribute('data-itp_support', 'true');

// Create the second element (g_id_signin)
    const gIdSigninDiv = document.createElement('div');
    gIdSigninDiv.className = 'g_id_signin';
    gIdSigninDiv.setAttribute('data-type', 'standard');
    gIdSigninDiv.setAttribute('data-shape', 'rectangular');
    gIdSigninDiv.setAttribute('data-theme', 'filled_black');
    gIdSigninDiv.setAttribute('data-text', 'signin_with');
    gIdSigninDiv.setAttribute('data-size', 'large');
    gIdSigninDiv.setAttribute('data-locale', 'en-US');
    gIdSigninDiv.setAttribute('data-logo_alignment', 'left');

// Get the parent element where you want to insert the created elements
    const parentElement = document.getElementById('button_form_containers');

// Insert the created elements after the "Sign In" button

    // @ts-ignore
    parentElement.insertBefore(gIdOnloadDiv, document.getElementById("signin_normal_button"));
    // @ts-ignore
    parentElement.appendChild(gIdSigninDiv);
  }
  loadGoogleSignInScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
