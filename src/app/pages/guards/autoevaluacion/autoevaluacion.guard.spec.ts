import { TestBed } from '@angular/core/testing';

import { AutoevaluacionGuard } from './autoevaluacion.guard';

describe('AutoevaluacionGuard', () => {
  let guard: AutoevaluacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoevaluacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
