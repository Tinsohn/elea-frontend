import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeclaracionJuradaComponent } from './dialog-declaracion-jurada.component';

describe('DialogDeclaracionJuradaComponent', () => {
  let component: DialogDeclaracionJuradaComponent;
  let fixture: ComponentFixture<DialogDeclaracionJuradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeclaracionJuradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeclaracionJuradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
