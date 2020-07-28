import { TestBed } from '@angular/core/testing';

import { PrecosService } from './precos.service';

describe('PrecosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrecosService = TestBed.get(PrecosService);
    expect(service).toBeTruthy();
  });
});
