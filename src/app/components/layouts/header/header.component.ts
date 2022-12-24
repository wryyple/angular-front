import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged!: boolean;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getLoginStatus().subscribe(value => this.isLogged = value);
  }
}
