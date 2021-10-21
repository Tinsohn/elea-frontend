import { Pregunta } from "./pregunta.interface";
import { Respuesta } from './respuesta.interface';

export interface PreguntaRespuesta {
    pregunta: Pregunta;
    respuesta: Respuesta | null;
}