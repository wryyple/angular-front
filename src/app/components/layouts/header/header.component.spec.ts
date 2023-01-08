import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {UserService} from "../../../services/user/user.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import iUser from "../../../interfaces/iUser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeUserService = jasmine.createSpyObj(['getLoginStatus', 'getUser', 'getUserFromAPI'])

  beforeEach(async () => {
    TestBed.overrideComponent(HeaderComponent, {
      set: {
        providers: []
      }
    });
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService }
      ]
    })
      .compileComponents();

    // default
    fakeUserService.getLoginStatus.and.returnValue(new BehaviorSubject<boolean>(false));
    fakeUserService.getUser.and.returnValue({id: 0});
    fakeUserService.getUserFromAPI.and.returnValue(new Observable(subscriber => {
      subscriber.next(<iUser>{level: 1});
      subscriber.complete();
    }));
    //

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
