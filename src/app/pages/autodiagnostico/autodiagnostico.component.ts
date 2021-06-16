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
      tempGrados: ''
    });
    this.sintomas = this.fb.group({
      sintoma_0: '',
      sintoma_1: '',
      sintoma_2: '',
      sintoma_3: '',
      sintoma_4: '',
      sintoma_5: '',
      sintoma_6: '',
      sintoma_7: '',
      sintoma_8: ''
    });
    this.antecedentes = this.fb.group({
      contactoEstrecho: ''
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
    console.log(`Autodiagnostico: `);
    console.log(this.temperatura);
  }

  submitSintomas(form: FormGroup) {
    this.sintomas = form;
    console.log(`Autodiagnostico: `);
    console.log(this.sintomas);
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

  reset() {
    // this.temperatura.reset();
    // this.temperaturaGrados = 37;
    // this.temperatura.setValue({tempGrados: this.temperaturaGrados});

    // this.sintomas.reset();
    // this.antecedentes.reset();
    this.router.navigate(['/autodiagnostico']);
    // return;
  }

  mostrarConsola() {
    // console.log(this.temperaturaGrados);
    // console.log(this.temperatura);
    return;
  }
}
