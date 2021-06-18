import { Component, OnInit } from '@angular/core';
import { AutoevaluacionStepperService } from '../../../services/autoevaluacion/autoevaluacion-stepper.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {
  txtCamposAntecedentes: string[] = [];

  constructor(public autodiagnosticoService: AutoevaluacionStepperService) { }

  ngOnInit(): void {
    this.txtCamposAntecedentes = this.autodiagnosticoService.getTxtCamposAntecedentes();
  }
}
