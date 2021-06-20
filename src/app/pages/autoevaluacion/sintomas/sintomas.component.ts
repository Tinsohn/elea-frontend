import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  get sintomas(): FormGroup {
    return this.autoevaluacionService.sintomas;
  }

  constructor(private autoevaluacionService: AutoevaluacionService) { }
}
