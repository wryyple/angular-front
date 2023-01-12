import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {UserService} from "../../../../services/user/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let fakeUserService = jasmine.createSpyObj(['signup'])

  beforeEach(async () => {
    TestBed.overrideComponent(RegisterComponent, { set: { providers: []}});
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: UserService, useValue: fakeUserService }
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    component.regForm = new FormGroup({
      email: new FormControl('123@mail.ru'),
      login: new FormControl('wwww'),
      password: new FormControl('ssss')
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit вызывает метод signup userService с определёнными данными', () => {
    component.onSumbit();

    expect(fakeUserService.signup).toHaveBeenCalled();
  });
});
