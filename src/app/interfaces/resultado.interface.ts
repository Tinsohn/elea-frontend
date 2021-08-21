import { Usuario } from './usuario.interface';

export interface Resultado {
    // idAutodiagnostico?    : number;
    legajo                 : Usuario;
    temperaturaLabel       : string;
    sintomasLabel          : string;
    contactosEstrechoLabel : string;
    antecedentesLabel      : string;
    temperatura?           : string;
    sintomas?              : string;
    contactoEstrecho?      : string; // TODO: separado
    antecedentes?          : string;
    estadoSintomas?        : boolean;
    estadoContactoEstrecho?: boolean;
    estadoAntecedentes?    : boolean;

	resultado              : boolean;
	fecha_autodiagnostico  : string;
	fecha_hasta_resultado  : string;
	comentario?            : string;
	modificadoPor?         : number;
	modificadoEn?          : Date;
}
/**
 * USOS:
 * - Guardar datos del ultimo autodiagnostico realizado por el usuario q esta ingresando (los autodiagnosticos q se reciben son de tipo Autodiagnostico)
 * - Enviar los datos del autodiagnostico q acaba de realizar el usuario
 */