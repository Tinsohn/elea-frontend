import { Injectable } from '@angular/core';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  // TODO: consumir servicio q provee los lugares de acceso (ahora esta hardcodeado)
  private _lugaresAcceso: LugarAcceso[] = [
    {
      id: 1,
      descripcion: "Planta VDM"
    },
    { 
      id: 2,
      descripcion: "Planta Disprofarma"
    },
    { 
      id: 3,
      descripcion: "Planta Pilar"
    },
    {
      id: 4,
      descripcion: "Planta Humahuaca"
    },
    { 
      id: 5,
      descripcion: "Fuerza de Venta"
    },
    { 
      id: 6,
      descripcion: "Home Office"
    }
  ]

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAcceso;
  }

  constructor() { }
}
