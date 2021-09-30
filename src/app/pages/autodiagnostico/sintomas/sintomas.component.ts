import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Pregunta } from 'src/app/interfaces/pregunta.interface';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent {

  get txtPreguntasSintomas(): string[] {
    return this._autodiagnosticoService.txtPreguntasSintomas;
  }

  get preguntasSintomas(): Pregunta[] {
    return this._autodiagnosticoService.preguntasSintomas;
  }

  // get sintomasForm(): FormGroup {
  //   return this.autoevaluacionService.sintomas;
  // }

  get formAutodiagnostico(): FormGroup {
    return this._autodiagnosticoService.formAutodiagnostico;
  }
  get sintomas(): FormArray {
    return this.formAutodiagnostico.get('sintomas') as FormArray;
  }

  constructor(private _autodiagnosticoService: AutodiagnosticoService) { }
}
