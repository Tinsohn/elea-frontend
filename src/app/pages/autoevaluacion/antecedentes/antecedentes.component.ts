import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AutoevaluacionService } from '../../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent {

  get txtCamposAntecedentes(): string[] {
    return this.autodiagnosticoService.txtCamposAntecedentes;
  }

  // get antecedentes(): FormGroup {
  //   return this.autodiagnosticoService.antecedentes;
  // }

  get formAutoevaluacion(): FormGroup {
    return this.autodiagnosticoService.formAutoevaluacion;
  }

  get antecedentes(): FormArray {
    return this.formAutoevaluacion.get('antecedentes') as FormArray;
  }
  
  constructor(private autodiagnosticoService: AutoevaluacionService) { }
}
