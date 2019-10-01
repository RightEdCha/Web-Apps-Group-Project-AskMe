import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewPage } from './question-view.page';

describe('QuestionViewPage', () => {
  let component: QuestionViewPage;
  let fixture: ComponentFixture<QuestionViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
