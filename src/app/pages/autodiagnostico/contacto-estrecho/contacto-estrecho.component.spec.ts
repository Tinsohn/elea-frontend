import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoEstrechoComponent } from './contacto-estrecho.component';

describe('ContactoEstrechoComponent', () => {
  let component: ContactoEstrechoComponent;
  let fixture: ComponentFixture<ContactoEstrechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoEstrechoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoEstrechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
