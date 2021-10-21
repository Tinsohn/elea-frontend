import { PreguntaRespuesta } from "./PreguntaRespuesta.interface";

export interface PerfilEmpleado {
    nroLegajo: string;
    
    emailUsuario: string;
    // idLugarAcceso: number;
    // antecedentesVacunas: Respuesta[];
    // preguntasRespuestasAntecedentes: PreguntaRespuesta[];
    // preguntasRespuestasVacunas: PreguntaRespuesta[];
    preguntasRespuestas: PreguntaRespuesta[];
    estadoLogico: number;
}