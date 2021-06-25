import { Usuario } from './usuario.interface';

export interface Autodiagnostico {
    idAutodiagnostico?    : number;
    usuario               : Usuario;
    temperaturaLabel      : string;
    sintomasLabel         : string;
    contactoEstrechoLabel : string;
    antecedentesLabel     : string;
    temperatura           : string;
    sintomas              : string;
    antecedentes          : string;
    sintomasEstado        : boolean;
    contactoEstrechoEstado: boolean;
    antecedentesEstado    : boolean;
}