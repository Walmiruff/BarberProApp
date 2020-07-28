import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusHorariosPage } from './meus-horarios.page';

describe('MeusHorariosPage', () => {
  let component: MeusHorariosPage;
  let fixture: ComponentFixture<MeusHorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusHorariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
