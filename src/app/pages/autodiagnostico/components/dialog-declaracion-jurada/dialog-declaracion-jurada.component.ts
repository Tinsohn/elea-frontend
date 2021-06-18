import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor() { }

  grabar() {
    console.log("GRABAR!!!!");
  }
}
