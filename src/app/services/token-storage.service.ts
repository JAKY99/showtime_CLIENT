import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {RolesEnum} from "../common/enums/authorities/roles-enum";
import {GlobalConstants} from "../common/constants/global-constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-Token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private header: HttpHeaders | undefined;


  constructor(private jwtHelperService: JwtHelperService, private http: HttpClient) { }
  logOut(): void{
    window.localStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): boolean{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token ? token.replace('Bearer ', '') : '');
    return true;
  }

  public saveRefreshToken(refreshToken: string): boolean{
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY,refreshToken ? refreshToken.replace('Bearer ', '') : '');
    return true;
  }

  public getToken(): string | null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string | null{
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public refreshToken(): Promise<any> {
    const refreshToken = this.getRefreshToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + refreshToken
    });
    if (refreshToken == null) {
      return Promise.reject('No refresh token in local storage')
    } else if (this.isRefreshTokenExpired(refreshToken)) {
      return Promise.reject('Refresh token is expired')
    } else {
      return this.http.get<any>(GlobalConstants.API_URL + '/api/v1/user/refresh', {observe: "response"}).toPromise()
        .then(response => {
          const authToken = response.headers.get('Authorization');
          const refreshToken = response.headers.get('Refresh');
          if (authToken != null && refreshToken != null) {
            this.saveToken(authToken);
            this.saveRefreshToken(refreshToken);
          } else {
            console.log('No token in response')
          }
        });
    }
  }

  isTokenExpired(token?: string | null): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;
    return this.jwtHelperService.isTokenExpired(token);
  }

  isRefreshTokenExpired(refreshToken?: string | null): boolean {
    if(!refreshToken) refreshToken = this.getRefreshToken();
    if(!refreshToken) return true;
    return this.jwtHelperService.isTokenExpired(refreshToken);
  }

  getClientAuthorities(token?: string){
    // @ts-ignore
    let decodeToken = this.jwtHelperService.decodeToken(!token ? this.getToken() : token);
    if (decodeToken == null) return null
    let roles = decodeToken.authorities;
    let newArrayOfAuthorities = {
      role: null,
      permissions: []
    };
    roles.map((currentRole: any) => {
      if (currentRole.authority.includes('ROLE_')){
        newArrayOfAuthorities.role = currentRole.authority;
      }else{
        // @ts-ignore
        newArrayOfAuthorities.permissions.push(currentRole.authority);
      }
    })
    return newArrayOfAuthorities;
  }

  getClientUsername(){
    // @ts-ignore
    let decodeToken = this.jwtHelperService.decodeToken(this.getToken());
    if (decodeToken == null) return null
    return decodeToken.sub;
  }

  isUserAnAdmin(token?: string): boolean{
    // @ts-ignore
    let decodeToken = this.jwtHelperService.decodeToken(!token ? this.getToken() : token);
    if (decodeToken == null) return false;
    let authorities = this.getClientAuthorities(token);
    // @ts-ignore
    return authorities.role === RolesEnum.ADMIN;

  }
}
