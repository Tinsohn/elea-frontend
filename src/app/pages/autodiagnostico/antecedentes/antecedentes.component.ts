import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { Vacuna } from 'src/app/interfaces/vacuna.interface';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent {

  get txtPreguntasAntecedentes(): string[] {
    return this._autodiagnosticoService.txtPreguntasAntecedentes;
  }

  get txtPreguntasVacunacion(): string[] {
    return this._autodiagnosticoService.txtPreguntasVacunacion;
  }

  // get antecedentes(): FormGroup {
  //   return this.autodiagnosticoService.antecedentes;
  // }

  get formAutodiagnostico(): FormGroup {
    return this._autodiagnosticoService.formAutodiagnostico;
  }

  get formVacunas(): FormGroup {
    return this._autodiagnosticoService.formVacunas;
  }

  get antecedentes(): FormArray {
    return this.formAutodiagnostico.get('antecedentes') as FormArray;
  }

  get vacunas(): Vacuna[] {
    return this._autodiagnosticoService.vacunas;
  }
  
  constructor(private _autodiagnosticoService: AutodiagnosticoService) { }
}
