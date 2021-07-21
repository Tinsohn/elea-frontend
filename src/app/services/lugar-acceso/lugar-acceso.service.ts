import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  // TODO: consumir servicio q provee los lugares de acceso (ahora esta hardcodeado)
  private _lugaresAcceso: LugarAcceso[] = [
    {
      idLugarAcceso: 1,
      descripcionLugarAcceso: "Planta VDM"
    },
    { 
      idLugarAcceso: 2,
      descripcionLugarAcceso: "Planta Disprofarma"
    },
    { 
      idLugarAcceso: 3,
      descripcionLugarAcceso: "Planta Pilar"
    },
    {
      idLugarAcceso: 4,
      descripcionLugarAcceso: "Planta Humahuaca"
    },
    { 
      idLugarAcceso: 5,
      descripcionLugarAcceso: "Fuerza de Venta"
    },
    { 
      idLugarAcceso: 6,
      descripcionLugarAcceso: "Home Office"
    }
  ]
  // private _lugaresAcceso: LugarAcceso[] = [];

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAcceso;
  }

  constructor(private http: HttpClient) {
    // this.recuperarLugaresDeAcceso()
    // .subscribe(lugaresAcceso => {
    //   this._lugaresAcceso = lugaresAcceso as LugarAcceso[];
    //   console.log(this._lugaresAcceso)
    // });
  }

  getLugarAccesoPorId(idLugarAcceso: number): LugarAcceso {
    return this._lugaresAcceso.filter(lugarAcceso => lugarAcceso.idLugarAcceso === idLugarAcceso)[0];
  }
  
  // getLugarAccesoPorIdBE(idLugarAcceso: number): Observable<string> {
  //   return this.http.get<string>(`${environment.autodiagnostico_backend}/lugaracceso/id/${idLugarAcceso}`);
  // }

  // private recuperarLugaresDeAcceso() {
  //   return this.http.get(`${environment.autodiagnostico_backend}/lugaracceso/lista`);
  // }
}
