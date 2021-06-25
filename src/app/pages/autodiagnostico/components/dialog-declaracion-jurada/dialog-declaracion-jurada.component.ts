import { Component } from '@angular/core';
import { AutodiagnosticoService } from '../../../../services/autodiagnostico/autodiagnostico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-declaracion-jurada',
  templateUrl: './dialog-declaracion-jurada.component.html',
  styleUrls: ['./dialog-declaracion-jurada.component.css']
})
export class DialogDeclaracionJuradaComponent {

  constructor(private router: Router,
              private autoEvaluacionService: AutodiagnosticoService) { }

  grabar() {
    this.autoEvaluacionService.grabarResultados();
    this.router.navigate(['/resultados']);
  }
}
