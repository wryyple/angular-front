import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-logout',
  template: '',
  styles: [
  ]
})
export class LogoutComponent implements OnInit {
  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit()
  {
    this._userService.logout();
  }
}
