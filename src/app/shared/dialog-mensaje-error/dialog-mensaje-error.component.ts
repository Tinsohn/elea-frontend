import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-mensaje-error',
  templateUrl: './dialog-mensaje-error.component.html',
  styleUrls: ['./dialog-mensaje-error.component.css']
})
export class DialogMensajeErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string|null,msg: string}) { }

  ngOnInit(): void {
    if ( !this.data.title ) {
      this.data.title = 'Oops... ocurrió un error!';
    }
  }

}
