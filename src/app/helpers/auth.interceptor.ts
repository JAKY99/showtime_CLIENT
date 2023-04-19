import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";
import {GlobalConstants} from "../common/constants/global-constants";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private TokenStorageService: any;
  private header: HttpHeaders | undefined;

  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.token.getToken();
    const refreshToken = this.token.getRefreshToken();;
    if (token != null){
      authReq = request.clone({headers: request.headers.set(GlobalConstants.TOKEN_HEADER_KEY, 'Bearer ' + token)})
    }
    if (refreshToken != null) {
      authReq = authReq.clone({headers: authReq.headers.set(GlobalConstants.TOKEN_HEADER_KEY_REFRESH, 'Bearer ' + refreshToken)})
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
