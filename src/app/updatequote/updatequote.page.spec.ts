import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequotePage } from './updatequote.page';

describe('UpdatequotePage', () => {
  let component: UpdatequotePage;
  let fixture: ComponentFixture<UpdatequotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatequotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatequotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
