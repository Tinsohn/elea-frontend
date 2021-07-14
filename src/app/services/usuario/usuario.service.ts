import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from 'src/app/interfaces/usuario.interface';
import { PropertiesService } from '../properties/properties.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _autodiagnostico_backend: string;

  private _usuario: Usuario | undefined;

  get usuario(): Usuario{
    return { ...this._usuario };
  }

  constructor(private http: HttpClient,
              private _propertiesService: PropertiesService) { 
                  this._autodiagnostico_backend = this._propertiesService.properties.autodiagnostico_backend;
              }

  // ---------------------
  // para el guard usuario
  // ---------------------
  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('nroLegajo')
        || !localStorage.getItem('dni')
        || !localStorage.getItem('nombre')
        || !localStorage.getItem('apellido')
        || !localStorage.getItem('telefono')
        || !localStorage.getItem('empresa')
        || !localStorage.getItem('emailL')
        || !localStorage.getItem('emailU')
        || !localStorage.getItem('idLugarAcceso')) {
      return of(false); 
    }
    
    // visitante
    if ( localStorage.getItem('nroLegajo') === '0' ) {
      this._usuario = {
        nroLegajo: localStorage.getItem('nroLegajo'),
        dni: localStorage.getItem('dni'),
        nombre: localStorage.getItem('nombre'),
        apellido: localStorage.getItem('apellido'),
        telefono: localStorage.getItem('telefono'),
        empresa: localStorage.getItem('empresa'),
        emailLaboral: localStorage.getItem('emailL'),
        emailUsuario: localStorage.getItem('emailU'),
        idLugarAcceso: Number(localStorage.getItem('idLugarAcceso'))
      }

      return of(true); 
    }

    // empleado
    return this.http.get<Usuario>(`${this._autodiagnostico_backend}/legajo/empleado/${localStorage.getItem('nroLegajo')}`)
            .pipe(
              map( usuario => {
                this._usuario = usuario;
                
                this._usuario.emailUsuario  = localStorage.getItem('emailU').toLowerCase();
                this._usuario.empresa       = 'ELEA';
                this._usuario.idLugarAcceso = Number(localStorage.getItem('idLugarAcceso'));

                // console.log(this._usuario)

                return true;
              }),
              catchError(() => of(false))
            );
  }

  // ----------------
  // ingreso empleado
  // ----------------
  autenticarUsuarioEmpleado(nroLegajo: string, emailUsuario: string, idLugarAcceso: number) {
    return this.http.get<Usuario>(`${this._autodiagnostico_backend}/legajo/empleado/${nroLegajo}`)
            .pipe(
              tap( usuario => {
                this._usuario = usuario;
                
                this._usuario.emailUsuario  = emailUsuario.toLowerCase();
                this._usuario.empresa       = 'ELEA';
                this._usuario.idLugarAcceso = idLugarAcceso;

                // console.log('empleado recibido', usuario)
                // console.log('usuario-empleado creado', this._usuario)
                
                this.guardarEnLocalStorage();               
              })
            );
  }

  // -----------------
  // ingreso visitante
  // -----------------
  crearUsuarioVisitante(form: FormGroup) {
    const { dni, nombre, apellido, telefono, empresa, emailUsuario, idLugarAcceso } = form.value;
    
    this._usuario = {
      nroLegajo: '0',
      dni: String(dni).toUpperCase(),
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      empresa: empresa,
      emailLaboral: null,
      emailUsuario: String(emailUsuario).toLowerCase(),
      idLugarAcceso: idLugarAcceso
    }

    this.guardarEnLocalStorage();
  }
  

  // -------------
  // cerrar sesion
  // -------------
  cerrarSesionUsuario() {
    // localStorage.clear();
    this._usuario = undefined;
  }

  

  //////////////////////////////////////////////////////////////////
  private guardarEnLocalStorage() {
    localStorage.setItem('nroLegajo', String(this._usuario.nroLegajo));
    localStorage.setItem('dni', String(this._usuario.dni).toUpperCase());
    localStorage.setItem('nombre', this._usuario.nombre);
    localStorage.setItem('apellido', this._usuario.apellido);
    localStorage.setItem('telefono', this._usuario.telefono);
    localStorage.setItem('empresa', this._usuario.empresa);
    localStorage.setItem('emailL', this._usuario.emailLaboral);
    localStorage.setItem('emailU', this._usuario.emailUsuario);
    localStorage.setItem('idLugarAcceso', String(this._usuario.idLugarAcceso));
  }
  //////////////////////////////////////////////////////////////////
}
