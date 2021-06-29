import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-mensaje-error-ingreso',
  templateUrl: './dialog-mensaje-error-ingreso.component.html',
  styleUrls: ['./dialog-mensaje-error-ingreso.component.css']
})
export class DialogMensajeErrorIngresoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) { }

  ngOnInit(): void {
  }

}
