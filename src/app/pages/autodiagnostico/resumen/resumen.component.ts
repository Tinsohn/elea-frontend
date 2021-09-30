import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DialogDeclaracionJuradaComponent } from '../components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';

import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { ResultadoService } from '../../../services/resultado/resultado.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();
  private isAceptado: boolean = false;

  @Input() stepper: any;

  get temperatura(): FormControl {
    return this._autodiagnosticoService.temperatura;
  }

  // get sintomas(): FormArray {
  //   return this._autodiagnosticoService.sintomas;
  // }

  get antecedentes(): FormArray {
    return this._autodiagnosticoService.antecedentes;
  }

  
  get formVacunas(): FormGroup {
    return this._autodiagnosticoService.formVacunas;
  }
  get vacunasDosis(): string[] {
    return this._autodiagnosticoService.formVacunas.get('vacunas')?.value;;
  }

  constructor(private router: Router,
              public dialog: MatDialog,
              private _resultadoService: ResultadoService,
              private _autodiagnosticoService: AutodiagnosticoService) { }

  reset(stepper: any) {
    stepper.reset();
    this._autodiagnosticoService.reset();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDeclaracionJuradaComponent, {
      width: '90%',
      maxWidth: '450px',
      data: { isAceptado: this.isAceptado }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isAceptado = result;
      
      // ENVIO DEL RESULTADO
      if (this.isAceptado) {
        this.isLoading.emit(true);

        // console.log('se acepto')
        this._resultadoService.grabarResultado()
          .subscribe( data => {
            // ID o respuesta
            // console.log('id autodiagnostico:', data);
            
            if(data > 0) {
              this.isLoading.emit(false);
              
              this.router.navigate(['/resultados']);
            }
          }, err => {
            // console.log(err)
            this._resultadoService.limpiarResultadosLocalStorage();
            this.isLoading.emit(false);
            this.dialog.open(DialogMensajeErrorComponent, {
              data: { msg: 'Hubo un problema al enviar los resultados del autodiagnóstico' }
            })
          });
      } else {
        // console.log('NO se acepto');
      }
      // TODO: eliminar este router!
      // this.router.navigate(['/resultados']);
    })
  }


  validarSintomas() {
    this._autodiagnosticoService.validarSintomasEstado();
    return this._autodiagnosticoService.sintomasEstado;
  }

  validarContactoEstrecho() {
    this._autodiagnosticoService.validarContactoEstrechoEstado();
    return this._autodiagnosticoService.contactoEstrechoEstado;
  }

  validarAntecedentes() {
    this._autodiagnosticoService.validarAntecedentesEstado();
    return this._autodiagnosticoService.antecedentesEstado;
  }

  getDescripcionVacunaPorId(idVacuna: string): string {
    return this._autodiagnosticoService.getDescripcionVacunaPorId(Number(idVacuna));
  }
}
