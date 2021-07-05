import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensajeErrorComponent } from './dialog-mensaje-error.component';

describe('DialogMensajeErrorComponent', () => {
  let component: DialogMensajeErrorComponent;
  let fixture: ComponentFixture<DialogMensajeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMensajeErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMensajeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
