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
    // visitante
    if (localStorage.getItem('dni')) {
      return of(true);
    }

    // no existe usuario alguno
    if (!localStorage.getItem('legajo')) {
       return of(false); 
    }

    // empleado
    return this.http.get<Usuario>(`${this.baseUrl}/legajo/empleado/${localStorage.getItem('legajo')}`)
            .pipe(
              map( usuario => {
                this._usuario = usuario;
                return true;
              } )
            );
  }

  // ----------------
  // ingreso empleado
  // ----------------
  autenticarUsuarioEmpleado(nroLegajo: string, dni: string) {
    return this.http.get<Usuario>(`${this.baseUrl}/legajo/empleado/${nroLegajo}`)
            .pipe(
              tap( usuario => {
                if( usuario.dni === dni ) {
                  this._usuario = usuario;

                  this._usuario.empresa = 'ELEA';
                  
                  localStorage.setItem('legajo', usuario.nroLegajo);
                } // ??????????????????????????????????????????????????
              }),
              catchError( () => of(null) )
            );
  }

  // -----------------
  // ingreso visitante
  // -----------------
  crearUsuarioVisitante(form: FormGroup) {
    this._usuario.dni = form.get('dni').value;
    this._usuario.nombre = form.get('nombre').value;
    this._usuario.apellido = form.get('apellido').value;
    this._usuario.telefono = form.get('telefono').value;
    this._usuario.empresa = form.get('empresa').value;
    this._usuario.mail = form.get('email').value
    this._usuario.lugarAcceso = form.get('lugarAcceso').value;

    localStorage.setItem('dni', form.get('dni').value); // DNI PORQ NO TIENE LEGAJO
  }


  // -------------
  // cerrar sesion
  // -------------
  cerrarSesionUsuario() {
    // localStorage.clear();
    this._usuario = undefined;
  }
}
