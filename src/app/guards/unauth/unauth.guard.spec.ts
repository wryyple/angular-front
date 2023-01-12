import {TestBed} from '@angular/core/testing';

import {UnauthGuard} from './unauth.guard';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {of} from "rxjs";

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

  it('UnauthGuard возвращает True при статусе пользователя False', () => {
    fakeUserService.getLoginStatus.and.returnValue(of(false));
    // @ts-ignore
    let res = guard.canActivate(null, null);
    expect(res).toBeTruthy();
  });

  it('UnauthGuard возвращает False при статусе пользователя True', () => {
    fakeUserService.getLoginStatus.and.returnValue(of(true));
    // @ts-ignore
    let res = guard.canActivate(null, null);
    expect(res).toBeFalsy();
  });
});
