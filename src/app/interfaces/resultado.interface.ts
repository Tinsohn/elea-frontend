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
    sintomasEstado?        : boolean;
    contactoEstrechoEstado?: boolean;
    antecedentesEstado?    : boolean;

	resultado              : boolean;
	fecha_autodiagnostico  : string;
	fecha_hasta_resultado  : string;
	comentario?            : string;
	modificadoPor?         : number;
	modificadoEn?          : Date;
}