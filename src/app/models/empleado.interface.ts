import { LugarAcceso } from "./lugar-acceso.interface";

export interface Empleado {
    // id?: number
    numeroLegajo: number;
    dni: number;
    nombre: string;
    apellido: string;
    email: string;
    estado: boolean;
    // fecha registro del autodiagnostico
    // fecha expiracion del autodiagnostico
    
    // lugarAcceso: LugarAcceso; ??? o string?
}