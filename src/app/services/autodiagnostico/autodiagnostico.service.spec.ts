import { TestBed } from '@angular/core/testing';

import { AutodiagnosticoService } from './autodiagnostico.service';

describe('AutodiagnosticoService', () => {
  let service: AutodiagnosticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutodiagnosticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
