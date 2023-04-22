import { Component, OnInit,Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {emailValidator} from "../../common/validators/emailValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpHeaders} from "@angular/common/http";
import {MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientErrorsEnum} from "../../common/enums/http-status-codes/client-errors-enum";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  private header: HttpHeaders | undefined;
  public registerForm: FormGroup;
  public isLoading: boolean = false;
  private isLoggedIn: boolean = false;
  public isLoginFailed: boolean = true;
  items: MenuItem[]=[];
  activeIndex: number = 0;
  public personalInformationForm: FormGroup;
  public isPersonalInfoNotValid: boolean = true ;
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private router: Router) {
    this.registerForm = new FormGroup({});
    this.personalInformationForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.goPrevious();
      }
    },
      {
        label: 'Account',
        command: (event: any) => {
          this.goAccountInfo()
        }
      },
    ];
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']).then(r => r);

    }

    this.registerForm = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email,
        emailValidator(GlobalRegex.emailRegex)
      ]),
      password: new FormControl('', Validators.required),
      repeatpassword: new FormControl('', Validators.required),

    });
    this.personalInformationForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
    });
  }
  get email(){
    return this.registerForm.get('email')?.value;
  }
  get password(){
    return this.registerForm.get('password')?.value;
  }

  get firstname(){
    return this.personalInformationForm.get('firstname')?.value;
  }
  get lastname(){
    return this.personalInformationForm.get('lastname')?.value;
  }

  submitLogin(): void {
    this.isLoading = true;
    this.authService.register(this.firstname,this.lastname,this.email, this.password,).toPromise()
      .then(response => {
        this.header = response.headers;
        // @ts-ignore
        this.isLoading = false;
        this.addSingleToast(
          'success',
          'Registration successful',
          'You have successfully registered. You will be redirected to the home page.',
          true
        )

        setTimeout(() => {
          this.router.navigate(['/login']).then(r => r);
        }, 3000);
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
    let repeatpassword = this.registerForm.get('password')?.value == this.registerForm.get('repeatpassword')?.value;
    this.isLoginFailed = !this.registerForm.invalid && repeatpassword? false : true;
  }
  reloadPage(): void {
    window.location.reload();
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }
  checkPersonalInfo() {
    let checkLength = this.personalInformationForm.get('firstname')?.value.length > 0 && this.personalInformationForm.get('lastname')?.value.length > 0;
    this.isPersonalInfoNotValid =  checkLength?false:true;
  }
  goAccountInfo() {
    this.activeIndex = 1;

    // @ts-ignore
    document.getElementById("formPersonalInfo").classList.remove("flex");
    // @ts-ignore
    document.getElementById("formPersonalInfo").style.display = "none";
    // @ts-ignore
    document.getElementById("formAccountInfo").classList.add("flex");
    // @ts-ignore
    document.getElementById("formAccountInfo").style.display = "flex";

  }

  goPrevious() {
    this.activeIndex = 0;
    // @ts-ignore
    document.getElementById("formAccountInfo").classList.remove("flex");
    // @ts-ignore
    document.getElementById("formAccountInfo").style.display = "none";
    // @ts-ignore
    document.getElementById("formPersonalInfo").classList.add("flex");
    // @ts-ignore
    document.getElementById("formPersonalInfo").style.display = "flex";

  }
}
