export interface Autodiagnostico {
    idAutodiagnostico     : number;
    nroLegajo             : string;
    dni                   : string;
    nombre                : string;
    apellido              : string;
    telefono              : string;
    empresa               : string;
    emailLaboral          : string;
    emailUsuario          : string;
    idLugarAcceso         : number;
    descripcionLugarAcceso: string;
    // estadoX y resultado => 0: false | 1: true
    estadoSintomas        : number;
    estadoContactoEstrecho: number;
    estadoAntecedentes    : number;
    resultado             : number;
    fecha_autodiagnostico : string;
    fecha_hasta_resultado : string;
    comentario            : string;
    modificadoPor         : number;
    modificadoEn          : Date;
}