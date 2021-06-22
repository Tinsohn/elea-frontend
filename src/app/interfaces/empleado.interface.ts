// import { LugarAcceso } from "./lugar-acceso.interface";

export interface Empleado {
    id?: number
    version: number;
    idAutoDiagnostico?: number;
    nroLegajo: number;
    dni: number;

    nombre: string;
    apellido: string;
    telefono: string;
    empresa?: string;
    mail: string;
    lugarAcceso: number; // Enum/Interface LugarAcceso
    estado: string; // boolean???

    resultado?: any; // ???

    fechaAutoDiagnostico?: Date; // string?

    fechaVencimiento?: Date; // string?
    
    password?: string;

    celular?: string;
    aceptarTerminoCondicion?: boolean; // ??????????????????????????
    
    resultadoRegistro?: string; // ???
    
    fechaHoraUltVisita?: Date; // string?
    
    fechaProceso?: Date; // string?
    
    fechaExpiracion?: Date; // string?
    idTipoEmpleado?: number;
    idTipoTareas?: number;
    idEstado?: number;
    idResultado?: number;
    status: boolean;
    telfPrivate?: string;
}