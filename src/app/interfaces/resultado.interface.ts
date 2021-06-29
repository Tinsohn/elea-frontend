import { Usuario } from './usuario.interface';

export interface Resultado {
    // idAutodiagnostico?    : number;
    legajo                 : Usuario;
    temperaturaLabel       : string;
    sintomasLabel          : string;
    contactoEstrechoLabel  : string;
    antecedentesLabel      : string;
    temperatura?           : string;
    sintomas?              : string;
    antecedentes?          : string;
    estadoSintomas?        : boolean;
    estadoContactoEstrecho?: boolean;
    estadoAntecedentes?    : boolean;

	resultado              : boolean;
	fecha_autodiagnostico  : Date;
	fecha_hasta_resultado  : Date;
	comentario?            : string;
	modificadoPor?         : number;
	modificadoEn?          : Date;
}