import { TestBed } from '@angular/core/testing';

import { PerfilEmpleadoGuard } from './perfil-empleado.guard';

describe('PerfilEmpleadoGuard', () => {
  let guard: PerfilEmpleadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilEmpleadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
