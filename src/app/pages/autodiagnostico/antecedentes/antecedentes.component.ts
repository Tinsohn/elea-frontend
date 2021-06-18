import { Component, OnInit } from '@angular/core';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {
  txtCamposAntecedentes: string[] = [];

  constructor(public autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
    this.txtCamposAntecedentes = this.autodiagnosticoService.getTxtCamposAntecedentes();
  }
}
