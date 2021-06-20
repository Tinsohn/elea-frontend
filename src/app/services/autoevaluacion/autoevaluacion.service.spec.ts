import { TestBed } from '@angular/core/testing';

import { AutoevaluacionService } from './autoevaluacion.service';

describe('AutoevaluacionStepperService', () => {
  let service: AutoevaluacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoevaluacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
