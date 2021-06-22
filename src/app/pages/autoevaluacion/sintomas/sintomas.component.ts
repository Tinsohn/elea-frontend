import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AutoevaluacionService } from '../../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent {

  get txtCamposSintomas(): string[] {
    return this.autoevaluacionService.txtCamposSintomas;
  }

  // get sintomasForm(): FormGroup {
  //   return this.autoevaluacionService.sintomas;
  // }

  get formAutoevaluacion(): FormGroup {
    return this.autoevaluacionService.formAutoevaluacion;
  }
  get sintomas(): FormArray {
    return this.formAutoevaluacion.get('sintomas') as FormArray;
  }

  constructor(private autoevaluacionService: AutoevaluacionService) { }
}
