import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  get antecedentes(): FormGroup {
    return this.autodiagnosticoService.antecedentes;
  }

  constructor(private autodiagnosticoService: AutoevaluacionService) { }
}
