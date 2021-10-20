import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAntecedentesVacunasComponent } from './forms-antecedentes-vacunas.component';

describe('FormsAntecedentesVacunasComponent', () => {
  let component: FormsAntecedentesVacunasComponent;
  let fixture: ComponentFixture<FormsAntecedentesVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsAntecedentesVacunasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsAntecedentesVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
