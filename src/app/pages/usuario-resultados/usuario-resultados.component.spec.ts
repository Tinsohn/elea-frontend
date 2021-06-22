import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioResultadosComponent } from './usuario-resultados.component';

describe('UsuarioResultadosComponent', () => {
  let component: UsuarioResultadosComponent;
  let fixture: ComponentFixture<UsuarioResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
