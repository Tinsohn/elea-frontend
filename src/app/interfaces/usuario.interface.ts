export interface Usuario {
    // id?           : number;
    nroLegajo     : string;
    dni           : string;
    nombre        : string;
    apellido      : string;
    telefono      : string;
    mail          : string;
    empresa?      : string;
    idLugarAcceso?: number;
}