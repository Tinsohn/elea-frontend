import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {
  txtCamposAntecedentes: string[] = [];

  antecedentes!: FormGroup;

  constructor(private fb: FormBuilder, private autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
    this.txtCamposAntecedentes = this.autodiagnosticoService.getTxtCamposAntecedentes();

    this.antecedentes = this.fb.group({
      antecedente_0: false,
      antecedente_1: false,
      antecedente_2: false,
      antecedente_3: false,
      antecedente_4: false,
      antecedente_5: false,
      antecedente_6: false,
      antecedente_7: false,
      antecedente_8: false
    });
  }

  submit() {
    
  }
}
