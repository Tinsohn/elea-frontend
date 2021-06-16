import { LugarAcceso } from "./lugar-acceso.interface";

export interface Visitante {
    dni: number;
    nombre: string;
    apellido: string;
    telefono: string;
    empresa: string;
    email: string;
    // fecha registro del autodiagnostico
    // fecha expiracion del autodiagnostico

    // lugarAcceso: LugarAcceso; ?? o string?
}