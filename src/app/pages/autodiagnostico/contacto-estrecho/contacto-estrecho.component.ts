import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-contacto-estrecho',
  templateUrl: './contacto-estrecho.component.html',
  styleUrls: ['./contacto-estrecho.component.css']
})
export class ContactoEstrechoComponent implements OnInit {

  get txtPreguntasContactoEstrecho(): string[] {
    return this._autodiagnosticoService.txtPreguntasContactoEstrecho;
  }

  get formAutodiagnostico(): FormGroup {
    return this._autodiagnosticoService.formAutodiagnostico;
  }

  get contactoEstrecho(): FormArray {
    return this.formAutodiagnostico.get('contactoEstrecho') as FormArray;
  }

  constructor(private _autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
  }

}
