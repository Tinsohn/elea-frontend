import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ResultadoService } from '../../services/resultado/resultado.service';
import { Resultado } from '../../interfaces/resultado.interface';
import { LugarAccesoService } from '../../services/lugar-acceso/lugar-acceso.service';

@Component({
  selector: 'app-usuario-resultados',
  templateUrl: './usuario-resultados.component.html',
  styleUrls: ['./usuario-resultados.component.css']
})
export class UsuarioResultadosComponent {

  get usuario(): Usuario {
    return { ...this.usuarioService.usuario }
  }

  get resultado(): Resultado {
    return this.resultadoService.resultado;
  }

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private resultadoService: ResultadoService,
              public lugarAccesoService: LugarAccesoService) { }

  cerrarSesion() {
    this.usuarioService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
}
