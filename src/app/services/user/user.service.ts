import {Injectable, OnInit} from '@angular/core';
import {GlobalVariable} from "../../globals/global";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private baseApiUrl: string = GlobalVariable.BASE_API_URL;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.updateLoginStatus();
  }

  private updateLoginStatus()
  {
    this.isLoggedIn.next(!!localStorage.getItem('token'));
  }

  public getLoginStatus()
  {
    this.updateLoginStatus();
    return this.isLoggedIn;
  }

  public getApiUrl() {
    return this.baseApiUrl;
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
          this.updateLoginStatus();

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
          this.updateLoginStatus();

          this._router.navigate(['/login']);
        }, error => {
          console.log(error);
        });
  }
}
