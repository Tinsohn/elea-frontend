import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Empleado } from 'src/app/interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseUrl: string = environment.baseUrlBE;

  private _empleado: Empleado | undefined;

  get empleado() {
    return { ...this._empleado };
  }

  constructor(private http: HttpClient) { }

  // getEmpleadoPorNroLegajo(nroLegajo: number): Observable<Empleado> {
  //   return this.http.get<Empleado>(`${this.baseUrl}/legajo/empleado/${nroLegajo}`);
  // }

  // para el guard usuario
  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('legajo')) {
       return of(false); 
    }

    return this.http.get<Empleado>(`${this.baseUrl}/legajo/empleado/${localStorage.getItem('legajo')}`)
            .pipe(
              map( empleado => {
                this._empleado = empleado;
                return true;
              } )
            );
  }

  // ingreso
  autenticarUsuario(nroLegajo: string) {
    return this.http.get<Empleado>(`${this.baseUrl}/legajo/empleado/${nroLegajo}`)
            .pipe(
              tap( empleado => this._empleado = empleado ),
              tap( empleado => localStorage.setItem('legajo', `${empleado.nroLegajo}`) )
            );
  }

  cerrarSesionUsuario() {
    // localStorage.clear();
    this._empleado = undefined;
  }
}
