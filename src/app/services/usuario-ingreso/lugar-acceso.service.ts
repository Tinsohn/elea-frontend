import { Injectable } from '@angular/core';
import { LugarAcceso } from '../../interfaces/lugar-acceso.interface';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  // TODO: consumir servicio q provee los lugares de acceso (ahora esta hardcodeado)
  private _lugaresAcceso: LugarAcceso[] = [
    {
      id: "planta-vdm",
      descripcion: "Planta VDM"
    },
    { 
      id: "planta-disprofarma",
      descripcion: "Planta Disprofarma"
    },
    { id: "planta-pilar",
      descripcion: "Planta Pilar"
    },
    {
      id: "planta-humahuaca",
      descripcion: "Planta Humahuaca"
    },
    { id: "fuerza-venta",
    descripcion: "Fuerza de Venta"
    },
    { id: "home-office",
      descripcion: "Home Office"
    }
  ]

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAcceso;
  }

  constructor() { }
}
