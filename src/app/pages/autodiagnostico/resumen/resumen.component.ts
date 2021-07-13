import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { DialogDeclaracionJuradaComponent } from '../components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';
import { logging } from 'protractor';
import { ResultadoService } from '../../../services/resultado/resultado.service';
import { Router } from '@angular/router';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';

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
    return this.autoevaluacionService.temperatura;
  }

  get sintomas(): FormArray {
    return this.autoevaluacionService.sintomas;
  }

  get antecedentes(): FormArray {
    return this.autoevaluacionService.antecedentes;
  }

  constructor(private router: Router,
              public dialog: MatDialog,
              private _resultadoService: ResultadoService,
              private autoevaluacionService: AutodiagnosticoService) { }

  reset(stepper: any) {
    stepper.reset();
    this.autoevaluacionService.reset();
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
            console.log('id autodiagnostico:', data);
            
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
