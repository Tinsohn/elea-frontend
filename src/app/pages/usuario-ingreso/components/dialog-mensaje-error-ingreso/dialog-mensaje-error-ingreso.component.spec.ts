import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensajeErrorIngresoComponent } from './dialog-mensaje-error-ingreso.component';

describe('DialogMensajeErrorIngresoComponent', () => {
  let component: DialogMensajeErrorIngresoComponent;
  let fixture: ComponentFixture<DialogMensajeErrorIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMensajeErrorIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMensajeErrorIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
