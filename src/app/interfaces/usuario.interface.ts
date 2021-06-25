export interface Usuario {
    id?         : number;
    nroLegajo?  : string;
    dni         : string;
    nombre      : string;
    apellido    : string;
    telefono    : string;
    empresa?    : string;
    mail        : string;
    lugarAcceso?: string;
}