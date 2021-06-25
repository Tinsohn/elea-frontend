import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { DialogDeclaracionJuradaComponent } from '../components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {

  @Input() stepper: any;

  get temperatura(): FormControl {
    return this.autoevaluacionService.temperatura;
  }

  get sintomas(): FormArray {
    return this.autoevaluacionService.sintomas;
  }

  get antecedentes(): FormArray {
    return this.autoevaluacionService.antecedentes;
  }

  constructor(public dialog: MatDialog,
              private autoevaluacionService: AutodiagnosticoService) { }

  reset(stepper: any) {
    stepper.reset();
    this.autoevaluacionService.reset();
  }

  openDialog() {
    this.dialog.open(DialogDeclaracionJuradaComponent, {
      width: '90%',
      maxWidth: '450px'
    });
  }


  validarSintomas() {
    this.autoevaluacionService.validarSintomasEstado();
    return this.autoevaluacionService.sintomasEstado;
  }

  validarContactoEstrecho() {
    this.autoevaluacionService.validarContactoEstrechoEstado();
    return this.autoevaluacionService.contactoEstrechoEstado;
  }

  validarAntecedentes() {
    this.autoevaluacionService.validarAntecedentesEstado();
    return this.autoevaluacionService.antecedentesEstado;
  }
}
