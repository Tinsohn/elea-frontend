import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';


import { PropertiesService } from '../properties/properties.service';
import { Properties } from '../../interfaces/properties.interface';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  // private autodiagnostico_backend = environment.autodiagnostico_backend;
  private autodiagnostico_backend: string | null;

  
  private _lugaresAcceso: LugarAcceso[] = [];

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAcceso;
  }

  constructor(private http: HttpClient,
              private _properties: PropertiesService) {
                this._properties.obtenerProperties()
                  .subscribe(properties => {
                    this.autodiagnostico_backend = properties.autodiagnostico_backend;
                  });
              }

  getLugaresAcceso() {
    // return this.http.get<LugarAcceso[]>(`${this.autodiagnostico_backend}/lugaracceso/accesos`);

    return this.http.get<Properties>(environment.filePath)
      .pipe(
        switchMap(properties => this.http.get<LugarAcceso[]>(`${properties.autodiagnostico_backend}/lugaracceso/accesos`))
      );
    
    // this.http.get<LugarAcceso[]>(`${this.autodiagnostico_backend}/lugaracceso/accesos`);
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
