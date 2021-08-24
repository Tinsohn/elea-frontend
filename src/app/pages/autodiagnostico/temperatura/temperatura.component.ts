import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {

  get txtPreguntaTemperatura() {
    return this._autodiagnosticoService.txtPreguntaTemperatura;
  }

  get temperaturaGrados(): number {
    return this._autodiagnosticoService.temperaturaValue;
  }

  constructor(private router: Router,
              private _autodiagnosticoService: AutodiagnosticoService,
              private _usuarioService: UsuarioService) {}

  volverIngreso() {
    this._usuarioService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
  
  cambiarTemp(valor: number) {
    this._autodiagnosticoService.cambiarTemp(valor);
    // console.log(this.autodiagnosticoService.temperaturaGrados);
  }

  // validar() {
  //   this.autoevaluacionService.validarSintomasEstado();
  // }
}
