import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PropertiesService } from '../properties/properties.service';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';


@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  // private autodiagnostico_backend = environment.autodiagnostico_backend;
  
  // private _lugaresAcceso: LugarAcceso[] = [];

  // get lugaresAcceso(): LugarAcceso[] {
  //   return this._lugaresAcceso;
  // }

  constructor(private http: HttpClient,
              private _propertiesService: PropertiesService) { }

  getLugaresAcceso() {
    // return this.http.get<LugarAcceso[]>(`${this.autodiagnostico_backend}/lugaracceso/accesos`);

    // return this.http.get<Properties>(environment.propertiesFilePath)
    //   .pipe(
    //     switchMap(properties => this.http.get<LugarAcceso[]>(`${properties.autodiagnostico_backend}/lugaracceso/accesos`))
    //   );
    
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<LugarAcceso[]>(`${properties.autodiagnostico_backend}/lugaracceso/accesos`))
      );
  }
  
  getLugarAccesoPorId(idLugarAcceso: number): Observable<LugarAcceso> {
    // return this.http.get<LugarAcceso>(`${environment.autodiagnostico_backend}/lugaracceso/accesos/${idLugarAcceso}`);

    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<LugarAcceso>(`${properties.autodiagnostico_backend}/lugaracceso/accesos/${idLugarAcceso}`))
      )
  }

  // getLugarAccesoPorId(idLugarAcceso: number): LugarAcceso {
  //   return this._lugaresAcceso.filter(lugarAcceso => lugarAcceso.idLugarAcceso === idLugarAcceso)[0];
  // }

  // private recuperarLugaresDeAcceso() {
  //   return this.http.get(`${environment.autodiagnostico_backend}/lugaracceso/lista`);
  // }
}
