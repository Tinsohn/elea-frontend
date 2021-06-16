import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {
  txtCamposSintomas : string[] = [];

  sintomas!: FormGroup;
  @Output() submitSintomas: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder, private autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
    this.txtCamposSintomas = this.autodiagnosticoService.getTxtCamposSintomas();

    this.sintomas = this.fb.group({
      sintoma_0: 'no',
      sintoma_1: 'no',
      sintoma_2: 'no',
      sintoma_3: 'no',
      sintoma_4: 'no',
      sintoma_5: 'no',
      sintoma_6: 'no',
      sintoma_7: 'no',
      sintoma_8: 'no'
    });
  }

  submit() {
    console.log(this.sintomas);
    this.submitSintomas.emit(this.sintomas);
  }
}
