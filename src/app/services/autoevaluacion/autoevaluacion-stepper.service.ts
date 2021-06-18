import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AutoevaluacionStepperService {
  private txtCamposSintomas: string[] = [
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
  private txtCamposAntecedentes: string[] = [
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

  temperaturaGrados: number = 37;
  sintomas: FormGroup = this.fb.group({
    sintoma_0: 'no',
    sintoma_1: 'no',
    sintoma_2: 'no',
    sintoma_3: 'no',
    sintoma_4: 'no',
    sintoma_5: 'no',
    sintoma_6: 'no',
    sintoma_7: 'no',
    sintoma_8: 'no'
  });
  antecedentes: FormGroup = this.fb.group({
    antecedente_0: false,
    antecedente_1: false,
    antecedente_2: false,
    antecedente_3: false,
    antecedente_4: false,
    antecedente_5: false,
    antecedente_6: false,
    antecedente_7: false,
    antecedente_8: false
  });

  constructor(private fb: FormBuilder) { }

  getTxtCamposSintomas(): string[] {
    return this.txtCamposSintomas;
  }

  getTxtCamposAntecedentes(): string[] {
    return this.txtCamposAntecedentes;
  }

  cambiarTemp(valor: number) {
    this.temperaturaGrados += valor
    this.temperaturaGrados *= 10;
    this.temperaturaGrados = Math.ceil(this.temperaturaGrados);
    this.temperaturaGrados /= 10;
  }

  reset(): void {
    this.temperaturaGrados = 37;
    this.setSintomasPorDefault();
    this.setAntecedentesPorDefault();
  }

  private setSintomasPorDefault() {
    this.sintomas.setValue({
      sintoma_0: 'no',
      sintoma_1: 'no',
      sintoma_2: 'no',
      sintoma_3: 'no',
      sintoma_4: 'no',
      sintoma_5: 'no',
      sintoma_6: 'no',
      sintoma_7: 'no',
      sintoma_8: 'no'
    });
  }

  private setAntecedentesPorDefault() {
    this.antecedentes.setValue({
      antecedente_0: false,
      antecedente_1: false,
      antecedente_2: false,
      antecedente_3: false,
      antecedente_4: false,
      antecedente_5: false,
      antecedente_6: false,
      antecedente_7: false,
      antecedente_8: false
    });
  }
}
