import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;

  //public test: string = this._userService.getApiUrl();

  constructor(
    private _userService: UserService,
  ) {
  }

  ngOnInit() {
    this._createAuthForm();
    // this.authForm.valueChanges.subscribe((v) => console.log(v));
  }

  private _createAuthForm() {
    this.authForm = new FormGroup<any>({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(8)
        ]),
    })
  }

  public onSubmit() {
    const formData = this.authForm.getRawValue();

    const data = {
      email: formData.login,
      password: formData.password
    };

    this._userService.signin(data);
  }

  public getControl(control: string) {
    return this.authForm.get(control)
  }

}
