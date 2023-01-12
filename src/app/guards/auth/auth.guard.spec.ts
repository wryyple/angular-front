import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {UserService} from "../../services/user/user.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, of} from "rxjs";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let fakeUserService = jasmine.createSpyObj(['getLoginStatus']);
  let fakeRouter = jasmine.createSpyObj('fakeRouter', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: fakeUserService},
        {provide: Router, useValue: fakeRouter}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('AuthGuard возвращает True', () => {
    fakeUserService.getLoginStatus.and.returnValue(of(true));
    // @ts-ignore
    guard.canActivate(null, null);
    expect(guard.getStatus()).toBeTruthy();
  });

  it('AuthGuard возвращает False', () => {
    fakeUserService.getLoginStatus.and.returnValue(of(false));
    // @ts-ignore
    guard.canActivate(null, null);
    expect(guard.getStatus()).toBeFalsy();
  });
});
