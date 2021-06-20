import { Component } from '@angular/core';
import { AutoevaluacionService } from '../../../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor(private autoEvaluacionService: AutoevaluacionService) { }

  grabar() {
    this.autoEvaluacionService.grabarResultados();
  }
}
