import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbeariaComponent } from './barbearia.component';

describe('BarbeariaComponent', () => {
  let component: BarbeariaComponent;
  let fixture: ComponentFixture<BarbeariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbeariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbeariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
