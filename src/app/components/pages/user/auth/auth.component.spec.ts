import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {UserService} from "../../../../services/user/user.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let fakeUserService = jasmine.createSpyObj(['signin']);

  beforeEach(async () => {
    TestBed.overrideComponent(AuthComponent, { set: { providers: []}});
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [
        { provide: UserService, useValue: fakeUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should use UserService signin() method', () => {
    component.onSubmit();
    expect(fakeUserService.signin).toHaveBeenCalled();
  });
});
