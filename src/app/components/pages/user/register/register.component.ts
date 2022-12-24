import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../../../../validators/passwordValidator";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public regForm!: FormGroup;

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit() {
    this._createForm();
  }

  private _createForm() {
    this.regForm = new FormGroup<any>({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
      confirm_password: new FormControl(null, [
        Validators.required,
      ])
    }, [passwordMatch('password', 'confirm_password')])
  }

  public getControl(control: string) {
    return this.regForm.get(control)
  };

  public onSumbit() {
    const formData = this.regForm.getRawValue();

    const data: Object = {
      email: formData.email,
      name: formData.login,
      password: formData.password,
    }

    this._userService.signup(data);
  }
}
