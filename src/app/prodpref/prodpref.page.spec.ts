import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdprefPage } from './prodpref.page';

describe('ProdprefPage', () => {
  let component: ProdprefPage;
  let fixture: ComponentFixture<ProdprefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdprefPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdprefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
