import { Respuesta } from "./respuesta.interface";

export interface PerfilEmpleado {
    nroLegajo: string;
    
    emailUsuario: string;
    // idLugarAcceso: number;
    antecedentesVacunas: Respuesta[];
}