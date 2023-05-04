import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InjectionToken} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenStorageService, JwtHelperService, InjectionToken, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
