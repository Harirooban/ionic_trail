import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaccessPage } from './quickaccess.page';

describe('QuickaccessPage', () => {
  let component: QuickaccessPage;
  let fixture: ComponentFixture<QuickaccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickaccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickaccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
