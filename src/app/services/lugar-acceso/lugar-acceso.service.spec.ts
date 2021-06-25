import { TestBed } from '@angular/core/testing';

import { LugarAccesoService } from './lugar-acceso.service';

describe('LugarAccesoService', () => {
  let service: LugarAccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LugarAccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
