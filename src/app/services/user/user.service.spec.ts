import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import iUser from "../../interfaces/iUser";
import {Observable} from "rxjs";

describe('UserService', () => {
  let service: UserService;
  let fakeHttp = jasmine.createSpyObj(['get', 'post']);
  let fakeRouter = jasmine.createSpyObj(['navigate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: fakeHttp},
        {provide: Router, useValue: fakeRouter},
      ]
    });

    let storage: Object = {};
    let fakeLocalStorage = {
      getItem: <T extends object, K extends keyof T>(key: K): T[K] | null => {
        return key in storage ? (<T>storage)[key] : null
      },
      setItem: <T extends object, K extends keyof T>(key: K, value: string): void => {
        (<T>storage)[key] = value as T[K];
      },
      removeItem: <T extends object, K extends keyof T>(key: K): void => {
        delete (<T>storage)[key];
      }
    }
    spyOn(localStorage, "getItem").and.callFake(fakeLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(fakeLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(fakeLocalStorage.removeItem);

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUser возвращает пустой объект пользователя', () => {
    let user = service.getUser();
    expect(user).toEqual(<iUser>{});
  });

  it('getUser возвращает объект пользователя', () => {
    localStorage.setItem('user', JSON.stringify({id: 1, level: 0}))
    let user = service.getUser();
    // console.log(user);
    expect(user).toEqual(<iUser>{id: 1, level: 0});
  });

  it('getUserFromAPI вызывает метод _http.get', () => {
    service.getUserFromAPI();
    expect(fakeHttp.get).toHaveBeenCalled();
  });

  it('updateLoginStatus возвращает true при существующих токене и юзере', () => {
    localStorage.setItem('token', '1');
    localStorage.setItem('user', JSON.stringify({id: 1}));

    expect(service.getLoginStatus).toBeTruthy();
  });

  it('updateLoginStatus вызывает метод logout при отсутсвующих данных в localStorage', () => {
    spyOn(service, 'logout').and.returnValue();
    // let status =
    service.getLoginStatus();
    // console.log(status.closed);
    expect(service.logout).toHaveBeenCalled();
  });

  it('signup вызывает метод navigate роутера', () => {
    fakeHttp.post.and.returnValue(new Observable((subscriber) => {
      subscriber.next();
      subscriber.complete();
    }));
    service.signup({});

    expect(fakeRouter.navigate).toHaveBeenCalled();
  });

  it('signin добавляет в localstorage токен и пользователя', () => {
    fakeHttp.post.and.returnValue(new Observable((subscriber) => {
      subscriber.next('testToken');
      subscriber.complete();
    }));

    spyOn(service, 'getUserFromAPI').and.returnValue(new Observable(subscriber => {
      subscriber.next({id: 1});
      subscriber.complete();
    }));

    service.signin({});
    expect(localStorage.getItem('token')).toBe('testToken');
    let user = localStorage.getItem('user') || '';
    expect(JSON.parse(user)).toEqual({id: 1});
  });

  it('logout удалаяет поля токена и пользователя в localstorage', () => {
    fakeHttp.get.and.returnValue(new Observable(subscriber => {
      subscriber.next();
      subscriber.complete();
    }));

    localStorage.setItem('token', '1');
    localStorage.setItem('user', JSON.stringify({id: 1}));
    service.logout();
    // console.log(localStorage.getItem('token'));
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
