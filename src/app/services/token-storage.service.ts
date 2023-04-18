import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {RolesEnum} from "../common/enums/authorities/roles-enum";
import {UserService} from "../services/user/user.service";
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelperService: JwtHelperService) { }
  logOut(): void{
    window.localStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): boolean{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token ? token.replace('Bearer ', '') : '');
    return true;
  }

  public getToken(): string | null{
    return localStorage.getItem(TOKEN_KEY);
  }

  isTokenExpired(token?: string | null): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;
    return this.jwtHelperService.isTokenExpired(token);
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
