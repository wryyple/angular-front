import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  private isLogged: boolean = false;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
  }

  getStatus()
  {
    return this.isLogged;
  }

  ngOnInit() {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._userService.getLoginStatus().subscribe(v => this.isLogged = v);
    if (this.isLogged) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }

}
