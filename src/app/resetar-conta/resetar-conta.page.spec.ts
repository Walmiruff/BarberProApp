import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetarContaPage } from './resetar-conta.page';

describe('ResetarContaPage', () => {
  let component: ResetarContaPage;
  let fixture: ComponentFixture<ResetarContaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetarContaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetarContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
