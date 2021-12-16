import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ResultadoService } from '../../services/resultado/resultado.service';
import { Resultado } from '../../interfaces/resultado.interface';
import { LugarAccesoService } from '../../services/lugar-acceso/lugar-acceso.service';
import { ParametrosService } from '../../services/parametros/parametros.service';
import { Subscription } from 'rxjs';
import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { PropertiesService } from '../../services/properties/properties.service';

@Component({
  selector: 'app-usuario-resultados',
  templateUrl: './usuario-resultados.component.html',
  styleUrls: ['./usuario-resultados.component.css']
})
export class UsuarioResultadosComponent implements OnInit, OnDestroy {

  existeImagen: boolean = false;

  nombreLugarAcceso: string = '';
  msjNoHabilitado: string = '';

  private _lugarAccesoSubscription: Subscription;
  private _parametrosSubscription: Subscription;
  private _propertiesSubscription: Subscription;

  get usuario(): Usuario {
    return { ...this._usuarioService.usuario }
  }

  get resultado(): Resultado {
    return this._resultadoService.resultado;
  }

  get vacunasDosis(): string[] {
    return this._autodiagnosticoService.formVacunas.get('vacunas')?.value;
  }

  constructor(private router: Router,
              private _usuarioService: UsuarioService,
              private _resultadoService: ResultadoService,
              public lugarAccesoService: LugarAccesoService,
              public parametrosService: ParametrosService,
              private _autodiagnosticoService: AutodiagnosticoService,
              private _propertiesService: PropertiesService) { }

  ngOnInit() {
    this._lugarAccesoSubscription = this.lugarAccesoService.getLugarAccesoPorId(this.usuario.idLugarAcceso)
      .subscribe(nombreLugarAcceso => {
        this.nombreLugarAcceso = nombreLugarAcceso.descripcionLugarAcceso;
      });

    this._parametrosSubscription = this.parametrosService.getParametros()
      .subscribe(parametros => {
        this.msjNoHabilitado = parametros[3].valorParametro;
      });

    this._propertiesSubscription = this._propertiesService.obtenerProperties()
      .subscribe(props => {
        this.existeImagen = props.mostrarImagenEvento;
      });
  }

  ngOnDestroy() {
    if(this._lugarAccesoSubscription) {
      this._lugarAccesoSubscription.unsubscribe();
    }

    if(this._parametrosSubscription) {
      this._parametrosSubscription.unsubscribe();
    }

    if(this._propertiesSubscription) {
      this._propertiesSubscription.unsubscribe();
    }
    localStorage.clear();
  }

  cerrarSesion() {
    this._usuarioService.cerrarSesionUsuario();
    this.router.navigate(['/ingreso']);
  }

  getDescripcionVacunaPorId(idVacuna: string, index: number): string {
    return this._autodiagnosticoService.getDescripcionVacunaPorId(Number(idVacuna), index);
  }
}
