import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ResultadoService } from '../../services/resultado/resultado.service';
import { Resultado } from '../../interfaces/resultado.interface';
import { LugarAccesoService } from '../../services/lugar-acceso/lugar-acceso.service';
import { ParametrosService } from '../../services/parametros/parametros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-resultados',
  templateUrl: './usuario-resultados.component.html',
  styleUrls: ['./usuario-resultados.component.css']
})
export class UsuarioResultadosComponent implements OnInit, OnDestroy {

  nombreLugarAcceso: string = '';
  msjNoHabilitado: string = '';

  private _lugarAccesoSubscription: Subscription;
  private _parametrosSubscription: Subscription;

  get usuario(): Usuario {
    return { ...this.usuarioService.usuario }
  }

  get resultado(): Resultado {
    return this.resultadoService.resultado;
  }

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private resultadoService: ResultadoService,
              public lugarAccesoService: LugarAccesoService,
              public parametrosService: ParametrosService) { }

  ngOnInit() {
    this._lugarAccesoSubscription = this.lugarAccesoService.getLugarAccesoPorId(this.usuario.idLugarAcceso)
      .subscribe(nombreLugarAcceso => {
        this.nombreLugarAcceso = nombreLugarAcceso.descripcionLugarAcceso;
      });

    this._parametrosSubscription = this.parametrosService.getParametros()
      .subscribe(parametros => {
        this.msjNoHabilitado = parametros[3].valorParametro;
      });
  }

  ngOnDestroy() {
    if(this._lugarAccesoSubscription) {
      this._lugarAccesoSubscription.unsubscribe();
    }

    if(this._parametrosSubscription) {
      this._parametrosSubscription.unsubscribe();
    }
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }
}
