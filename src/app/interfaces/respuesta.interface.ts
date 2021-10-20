export interface Respuesta {
    id?              : number;
    idAutodiagnostico: number;
    idPregunta       : number;
    respuestaPregunta: string;

    idPantalla?: number;
}

/**
 * "id": null,
        "idAutodiagnostico": 242,
        "idPregunta": 16,
        "textoPregunta": "Tengo enfermedad renal crónica.",
        "respuestaPregunta": "0"
 */