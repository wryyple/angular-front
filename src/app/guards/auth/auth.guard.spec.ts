import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let fakeUserService = jasmine.createSpyObj(['getLoginStatus']);
  let fakeRouter = jasmine.createSpyObj(['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
