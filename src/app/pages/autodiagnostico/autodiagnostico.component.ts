import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-autodiagnostico',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: ['./autodiagnostico.component.css']
})
export class AutodiagnosticoComponent implements OnInit {
  isEditable: boolean = true;

  // temperaturaGrados    : number = 37;
  // txtCamposSintomas    : string[] = [];
  // txtCamposAntecedentes: string[] = [];

  temperatura : FormGroup;
  sintomas    : FormGroup;
  antecedentes: FormGroup;

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
    // this.txtCamposSintomas     = this.autodiagnosticoService.getTxtCamposSintomas();
    // this.txtCamposAntecedentes = this.autodiagnosticoService.getTxtCamposAntecedentes();

    this.temperatura = this.fb.group({
      tempGrados: '37.0'
    });
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
  
  // cambiarTemp(valor: number) {
  //   this.temperaturaGrados += valor
  //   this.temperaturaGrados *= 10;
  //   this.temperaturaGrados = Math.ceil(this.temperaturaGrados);
  //   this.temperaturaGrados /= 10;
  // }



  submitTempAutodiag(form: FormGroup) {
    this.temperatura = form;
    // console.log(`Autodiagnostico: `);
    // console.log(this.temperatura);
  }

  submitSintomas(form: FormGroup) {
    this.sintomas = form;
    // console.log(`Autodiagnostico: `);
    // console.log(this.sintomas);
  }

  submitAntecedentes(form: FormGroup) {
    this.antecedentes = form;
  }








  // submit(nombreForm: string) {
  //   console.log(`Formulario: ${nombreForm}`);

    // this.temperatura = this.fb.group({
    //   tempGrados: `${ this.temperaturaGrados }`
    // });

  //   console.log(this.temperatura.value);
  // }

  // volverIngreso() {
  //   this.router.navigate(['/usuario-ingreso']);
  // }

  reset(stepper: any) {
    stepper.reset();
    // this.temperatura.reset();
    // this.temperaturaGrados = 37;
    this.temperatura.setValue({
      tempGrados: 37
    });

    this.sintomas.setValue({
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

    this.antecedentes.setValue({
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

    // this.router.navigate(['/autodiagnostico']);
    // return;
  }

  mostrarConsola() {
    // console.log(this.temperaturaGrados);
    // console.log(this.temperatura);
    return;
  }
}
