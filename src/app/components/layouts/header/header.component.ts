import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import iUser from "../../../interfaces/iUser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged!: boolean;
  user_id!: number;
  isModerator!: boolean;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getLoginStatus().subscribe(value => this.isLogged = value);
    this.user_id = this._userService.getUser().id;
    this._userService.getUserFromAPI().subscribe(u => this.isModerator = (<iUser>u).level > 0)
  }
}
