import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  private autodiagnostico_backend = environment.autodiagnostico_backend;

  
  private _lugaresAcceso: LugarAcceso[] = [];

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAcceso;
  }

  constructor(private http: HttpClient) { }

  getLugaresAcceso() {
    return this.http.get<LugarAcceso[]>(`${this.autodiagnostico_backend}/lugaracceso/accesos`);
  }
  
  getLugarAccesoPorId(idLugarAcceso: number): Observable<LugarAcceso> {
    return this.http.get<LugarAcceso>(`${environment.autodiagnostico_backend}/lugaracceso/accesos/${idLugarAcceso}`);
  }

  // getLugarAccesoPorId(idLugarAcceso: number): LugarAcceso {
  //   return this._lugaresAcceso.filter(lugarAcceso => lugarAcceso.idLugarAcceso === idLugarAcceso)[0];
  // }

  // private recuperarLugaresDeAcceso() {
  //   return this.http.get(`${environment.autodiagnostico_backend}/lugaracceso/lista`);
  // }
}
