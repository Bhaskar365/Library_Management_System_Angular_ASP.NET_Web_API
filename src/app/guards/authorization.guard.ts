import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../models/models';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private api:ApiService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.api.isLoggedIn()){
        if(this.api.getTokenUserInfo()?.userType === UserType.ADMIN){
          return true;
        }
        return false;
    }
    return false;
  }
  
}
