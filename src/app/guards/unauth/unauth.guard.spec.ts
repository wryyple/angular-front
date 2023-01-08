import {TestBed} from '@angular/core/testing';

import {UnauthGuard} from './unauth.guard';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

describe('UnauthGuard', () => {
  let guard: UnauthGuard;
  let fakeUserService = jasmine.createSpyObj(['getLoginStatus', 'getUser']);
  let fakeRouter = jasmine.createSpyObj(['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: fakeUserService},
        {provide: Router, useValue: fakeRouter}
      ]
    });
    guard = TestBed.inject(UnauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
