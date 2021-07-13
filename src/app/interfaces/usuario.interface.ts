export interface Usuario {
    // id?           : number;
    nroLegajo     : string;
    dni           : string;
    nombre        : string;
    apellido      : string;
    telefono      : string;
    emailLaboral? : string;
    emailUsuario? : string;
    empresa?      : string;
    idLugarAcceso?: number;
}