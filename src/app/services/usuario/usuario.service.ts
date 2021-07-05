import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = environment.baseUrlBE;

  private _usuario: Usuario | undefined;

  get usuario(): Usuario{
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

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
        || !localStorage.getItem('mail')
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
        mail: localStorage.getItem('mail'),
        idLugarAcceso: Number(localStorage.getItem('idLugarAcceso'))
      }

      return of(true); 
    }

    // empleado
    return this.http.get<Usuario>(`${this.baseUrl}/legajo/empleado/${localStorage.getItem('nroLegajo')}`)
            .pipe(
              map( usuario => {
                this._usuario = usuario;
                
                this._usuario.empresa       = 'ELEA';
                this._usuario.idLugarAcceso = Number(localStorage.getItem('idLugarAcceso'));
                return true;
              }),
              catchError(() => of(false))
            );
  }

  // ----------------
  // ingreso empleado
  // ----------------
  autenticarUsuarioEmpleado(nroLegajo: string, idLugarAcceso: number) {
    return this.http.get<Usuario>(`${this.baseUrl}/legajo/empleado/${nroLegajo}`)
            .pipe(
              tap( usuario => {
                this._usuario = usuario;
                
                this._usuario.empresa     = 'ELEA';
                this._usuario.idLugarAcceso = idLugarAcceso;
                
                this.guardarEnLocalStorage();               
              })
            );
  }

  // -----------------
  // ingreso visitante
  // -----------------
  crearUsuarioVisitante(form: FormGroup) {
    const { dni, nombre, apellido, telefono, empresa, email, idLugarAcceso } = form.value;
    
    this._usuario = {
      nroLegajo: '0',
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      empresa: empresa,
      mail: email,
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
    localStorage.setItem('dni', String(this._usuario.dni));
    localStorage.setItem('nombre', this._usuario.nombre);
    localStorage.setItem('apellido', this._usuario.apellido);
    localStorage.setItem('telefono', this._usuario.telefono);
    localStorage.setItem('empresa', this._usuario.empresa);
    localStorage.setItem('mail', this._usuario.mail);
    localStorage.setItem('idLugarAcceso', String(this._usuario.idLugarAcceso));
  }
  //////////////////////////////////////////////////////////////////
}
