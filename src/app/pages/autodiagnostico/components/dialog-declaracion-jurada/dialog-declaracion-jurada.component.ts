import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResultadoService } from '../../../../services/resultado/resultado.service';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor(private router: Router,
              private _resultadoService: ResultadoService,
              @Inject(MAT_DIALOG_DATA) private data: {isAceptado:boolean}) { }

  // grabar() {
  //   this._resultadoService.grabarResultado()
  //     .subscribe( data => {
  //       console.log('DECLARACION JUGARADA RECIBIO:', data);

  //       if(data !== false) {
  //         this.router.navigate(['/resultados']);
  //       }
  //     },
  //     () => alert('hubo un error'));

  //   // this.router.navigate(['/resultados']);
  // }

  aceptar() {
    this.data.isAceptado = true;
  }

  cancelar() {
    this.data.isAceptado = false;
  }
}
