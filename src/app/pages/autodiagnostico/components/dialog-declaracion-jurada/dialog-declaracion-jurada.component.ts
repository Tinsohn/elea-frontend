import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: {isAceptado:boolean}) { }

  aceptar() {
    this.data.isAceptado = true;
  }

  cancelar() {
    this.data.isAceptado = false;
  }
}
