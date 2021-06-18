import { Component, OnInit } from '@angular/core';
import { AutoevaluacionStepperService } from '../../../services/autoevaluacion/autoevaluacion-stepper.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {
  txtCamposSintomas : string[] = [];

  constructor(public autodiagnosticoService: AutoevaluacionStepperService) { }

  ngOnInit(): void {
    this.txtCamposSintomas = this.autodiagnosticoService.getTxtCamposSintomas();
  }
}
