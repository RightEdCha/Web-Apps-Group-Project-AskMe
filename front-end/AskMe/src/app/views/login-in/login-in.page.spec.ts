import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInPage } from './login-in.page';

describe('LoginInPage', () => {
  let component: LoginInPage;
  let fixture: ComponentFixture<LoginInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
