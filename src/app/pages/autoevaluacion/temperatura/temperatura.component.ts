import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AutoevaluacionService } from '../../../services/autoevaluacion/autoevaluacion.service';
import { EmpleadoService } from '../../../services/usuario-ingreso/empleado/empleado.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {

  // get temperaturaGrados(): number {
  //   return this.autoevaluacionService.temperaturaGrados;
  // }
  get temperaturaGrados(): number {
    return this.autoevaluacionService.temperaturaValue;
  }

  constructor(private router: Router,
              private autoevaluacionService: AutoevaluacionService,
              private empleadoService: EmpleadoService) {}

  volverIngreso() {
    this.empleadoService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
  
  cambiarTemp(valor: number) {
    this.autoevaluacionService.cambiarTemp(valor);
    // console.log(this.autodiagnosticoService.temperaturaGrados);
  }

  // validar() {
  //   this.autoevaluacionService.validarSintomasEstado();
  // }
}
