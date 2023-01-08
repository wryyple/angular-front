import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('UserService', () => {
  let service: UserService;
  let fakeHttp = jasmine.createSpyObj(['get', 'post']);
  let fakeRouter = jasmine.createSpyObj(['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: fakeHttp },
        { provide: Router, useValue: fakeRouter }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
