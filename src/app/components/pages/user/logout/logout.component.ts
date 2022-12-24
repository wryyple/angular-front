import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: '',
  styles: [
  ]
})
export class LogoutComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
  }

  ngOnInit()
  {
    this._userService.logout();
  }
}
