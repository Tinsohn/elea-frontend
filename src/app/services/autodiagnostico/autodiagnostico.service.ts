import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService {
  txtCamposSintomas: string[] = [
    "¿Percibiste una marcada pérdida del olfato de manera repentina?",
    "¿Percibiste una marcada pérdida del gusto (sabor de los alimentos) de manera repentina?",
    "¿Tenés tos?",
    "¿Tenés dolor de garganta?",
    "¿Tenés dificultad respiratoria o falta de aire?",
    "¿Tenés dolor de cabeza?",
    "¿Tenés diarrea?",
    "¿Tenés vómitos?",
    "¿Tenés dolor muscular?",
  ];

  txtCamposAntecedentes: string[] = [
    "Trabajo o convivo con una persona que actualmente es caso confirmado de COVID-19",
    "Pasé en los últimos 14 días al menos 15 minutos cerca de una persona que actualmente es caso confirmado de COVID-19",
    "Tengo/tuve cáncer",
    "Tengo diabetes",
    "Tengo alguna enfermedad hepática",
    "Tengo enfermedad renal crónica",
    "Tengo alguna enfermedad respiratoria",
    "Tengo alguna enfermedad cardiológica",
    "Tengo alguna condición que baja las defensas"
  ];

  constructor() { }

  getTxtCamposSintomas(): string[] {
    return this.txtCamposSintomas;
  }

  getTxtCamposAntecedentes(): string[] {
    return this.txtCamposAntecedentes;
  }
}
