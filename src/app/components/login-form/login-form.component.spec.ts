import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginFormComponent} from './login-form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpHandler} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {TokenStorageService} from "../../services/token-storage.service";
import {By} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MessageService, AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email is empty', () => {
    expect(component.loginForm.controls['email'].value).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeFalsy();
  });

  it('should call AuthService login method when form is submitted', () => {
    const email = 'test@example.com';
    const password = 'password';
    spyOn(authService, 'login').and.callThrough();
    component.loginForm.controls.email.setValue(email);
    component.loginForm.controls.password.setValue(password);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    button.click();
    expect(authService.login(email, password)).toHaveBeenCalled();
  });
});
