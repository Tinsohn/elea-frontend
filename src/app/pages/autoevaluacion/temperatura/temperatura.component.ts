import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AutoevaluacionService } from '../../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {

  get temperaturaGrados(): number {
    return this.autoevaluacionService.temperaturaGrados;
  }

  constructor(private router: Router,
              private autoevaluacionService: AutoevaluacionService) {}

  volverIngreso() {
    this.router.navigate(['/usuario-ingreso']);
  }
  
  cambiarTemp(valor: number) {
    this.autoevaluacionService.cambiarTemp(valor);
    // console.log(this.autodiagnosticoService.temperaturaGrados);
  }

  validar() {
    this.autoevaluacionService.validarSintomasEstado();
  }
}
