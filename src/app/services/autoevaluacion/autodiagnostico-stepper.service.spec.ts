import { TestBed } from '@angular/core/testing';

import { AutoevaluacionStepperService } from './autoevaluacion-stepper.service';

describe('AutoevaluacionStepperService', () => {
  let service: AutoevaluacionStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoevaluacionStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
