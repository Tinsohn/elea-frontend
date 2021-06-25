import { TestBed } from '@angular/core/testing';

import { AutodiagnosticoGuard } from './autodiagnostico.guard';

describe('AutodiagnosticoGuard', () => {
  let guard: AutodiagnosticoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutodiagnosticoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
