import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import {UserService} from "../../../../services/user/user.service";


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let fakeUserService = jasmine.createSpyObj(['logout']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers: [
        LogoutComponent,
        { provide: UserService, useValue: fakeUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should use UserService logout() function', () => {
    component.ngOnInit();
    expect(fakeUserService.logout).toHaveBeenCalled();
  });
});
