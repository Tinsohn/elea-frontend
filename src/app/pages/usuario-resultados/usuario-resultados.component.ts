import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpleadoService } from '../../services/usuario-ingreso/empleado/empleado.service';

@Component({
  selector: 'app-usuario-resultados',
  templateUrl: './usuario-resultados.component.html',
  styleUrls: ['./usuario-resultados.component.css']
})
export class UsuarioResultadosComponent implements OnInit {

  isHabilitado: boolean = true;

  constructor(private router: Router, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.empleadoService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
}
