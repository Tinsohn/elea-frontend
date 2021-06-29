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

  get temperaturaGrados(): number {
    return this._autoevaluacionService.temperaturaValue;
  }

  constructor(private router: Router,
              private _autoevaluacionService: AutodiagnosticoService,
              private _usuarioService: UsuarioService) {}

  volverIngreso() {
    this._usuarioService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
  
  cambiarTemp(valor: number) {
    this._autoevaluacionService.cambiarTemp(valor);
    // console.log(this.autodiagnosticoService.temperaturaGrados);
  }

  // validar() {
  //   this.autoevaluacionService.validarSintomasEstado();
  // }
}
