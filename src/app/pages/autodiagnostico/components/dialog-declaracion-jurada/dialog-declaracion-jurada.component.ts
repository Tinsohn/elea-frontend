import { Component } from '@angular/core';
import { AutodiagnosticoService } from '../../../../services/autodiagnostico/autodiagnostico.service';
import { Router } from '@angular/router';
import { ResultadoService } from '../../../../services/resultado/resultado.service';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor(private router: Router,
              private _resultadoService: ResultadoService) { }

  grabar() {
    this._resultadoService.grabarResultado();
    this.router.navigate(['/resultados']);
  }
}
