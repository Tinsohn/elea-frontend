import { Component, OnInit } from '@angular/core';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {
  txtCamposSintomas : string[] = [];

  constructor(private fb: FormBuilder, public autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
    this.txtCamposSintomas = this.autodiagnosticoService.getTxtCamposSintomas();
  }
}
