import { Injectable } from '@angular/core';
import { LugarAcceso } from '../models/lugar-acceso.interface';

@Injectable({
  providedIn: 'root'
})
export class LugarAccesoService {
  lugaresAcceso: LugarAcceso[] = [
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

  constructor() { }

  getLugaresAcceso(): LugarAcceso[] {
    return this.lugaresAcceso;
  }
}
