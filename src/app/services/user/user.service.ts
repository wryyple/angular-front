import {Injectable, OnInit} from '@angular/core';
import {GlobalVariable} from "../../globals/global";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import iUser from "../../interfaces/iUser";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private baseApiUrl: string = GlobalVariable.BASE_API_URL;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private userLevel: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.updateLoginStatus();
  }

  private updateLoginStatus() {
    this.isLoggedIn.next(!!localStorage.getItem('token') && !!localStorage.getItem('user'));
  }

  public getLoginStatus() {
    this.updateLoginStatus();
    if (!this.isLoggedIn){
      this.logout();
    }
    return this.isLoggedIn;
  }

  public signup(data: Object) {
    this._http.post('http://' + this.baseApiUrl + '/api/signup', data)
      .subscribe(
        result => {
          this._router.navigate(['/login']);
        }, error => {
          console.log(error);
        });
  }

  public signin(data: Object) {
    this._http.post('http://' + this.baseApiUrl + '/api/signin', data)
      .subscribe(
        result => {
          localStorage.setItem('token', result.toString());
          this.getUserFromAPI().subscribe(result => {
            let user = new Object(result as iUser);
            localStorage.setItem('user', JSON.stringify(user));
            this.updateLoginStatus();
          });

          this._router.navigate(['/']);
        }, error => {
          console.log(error);
        });
  }

  public logout() {
    this._http.get('http://' + this.baseApiUrl + '/api/logout')
      .subscribe(
        result => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.updateLoginStatus();
          this._router.navigate(['/login']);
        }, error => {
          console.log(error);
        });
  }

  public getUserFromAPI() {
    return this._http.get('http://' + this.baseApiUrl + '/api/user');
  }

  public getUser():iUser
  {
    return <iUser>JSON.parse(localStorage.getItem('user') || '');
  }
}
