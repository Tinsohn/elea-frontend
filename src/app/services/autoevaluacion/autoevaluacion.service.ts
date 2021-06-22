import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AutoevaluacionService {
  // --------
  //  CAMPOS
  // --------
  // Campos: Form
  private _formAutoevaluacion: FormGroup = this.fb.group({
    temperatura: [37],
    sintomas: this.fb.array([
      ['no'],
      ['no'],
      ['no'],
      ['no'],
      ['no'],
      ['no'],
      ['no'],
      ['no'],
      ['no']
    ]),
    antecedentes: this.fb.array([
      [false],
      [false],
      [false],
      [false],
      [false],
      [false],
      [false],
      [false],
      [false]
    ])
  });

  // Campos: Estados
  private _sintomasEstado        : boolean = false;
  private _contactoEstrechoEstado: boolean = false;
  private _antecedentesEstado    : boolean = false;

  // Campos: Leyendas sintomas y antecedentes
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

  // ---------
  //  GETTERS
  // ---------
  // Getters: Form
  get formAutoevaluacion(): FormGroup {
    return this._formAutoevaluacion;
  }

  get temperatura(): FormControl {
    return this._formAutoevaluacion.get('temperatura') as FormControl;
  }
  get sintomas(): FormArray {
    return this._formAutoevaluacion.get('sintomas') as FormArray;
  }
  get antecedentes(): FormArray {
    return this._formAutoevaluacion.get('antecedentes') as FormArray;
  }
  // Getter y setter: valores de temperatura
  get temperaturaValue(): number {
    return this._formAutoevaluacion.get('temperatura').value;
  }
  set temperaturaValue(temperaturaValue: number) {
    this._formAutoevaluacion.get('temperatura').setValue(temperaturaValue);
  }

  // Getters: Estados
  get sintomasEstado(): boolean {
    return this._sintomasEstado;
  }
  get contactoEstrechoEstado(): boolean {
    return this._contactoEstrechoEstado;
  }
  get antecedentesEstado(): boolean {
    return this._antecedentesEstado;
  }


  constructor(private fb: FormBuilder) { }


  // --------
  //  Grabar
  // --------
  grabarResultados(): void {
    // console.log(this._sintomas.get('sintoma_0').value);
  }

  // ----------
  //  Resetear
  // ----------
  reset(): void {
    this.resetTemperatura();
    this.resetSintomas();
    this.resetAntecedentes();

    this._sintomasEstado         = false;
    this._contactoEstrechoEstado = false;
    this._antecedentesEstado     = false;
  }

  private resetTemperatura() {
    this.temperatura.reset(37)
  }
  private resetSintomas() {
    this.sintomas.reset([
      'no',
      'no',
      'no',
      'no',
      'no',
      'no',
      'no',
      'no',
      'no'
    ])
  }
  private resetAntecedentes() {
    this.antecedentes.reset([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  }
  
  // --------------
  //  Validaciones
  // --------------
  validarSintomasEstado(): void {
    // temperatura
    if (this.temperaturaValue < 36
      || this.temperaturaValue > 37.5) {
        this._sintomasEstado = true;
      } else {
        // sintomas
        let sintomasArray = this.sintomas.value as Array<string>;

        this._sintomasEstado = sintomasArray.includes('si');
        // if(sintomasArray.includes('si')) {
        //   this._sintomasEstado = true;
        // } else {
        //   this._sintomasEstado = false;
        // }

      }
  }

  validarContactoEstrechoEstado(): void {
    let antecedentesFormArr = this.antecedentes.value as Array<boolean>;
    // console.log(antecedentesArr)
    
    let contactoEstrechoArr: boolean[] = antecedentesFormArr.slice(0, 2);
    // console.log(contactoEstrechoArr);

    this._contactoEstrechoEstado = contactoEstrechoArr.includes(true);
    // console.log(this._contactoEstrechoEstado);
  }

  validarAntecedentesEstado(): void {
    let antecedentesFormArr = this.antecedentes.value as Array<boolean>;

    let antecedentesArr: boolean[] = antecedentesFormArr.slice(2, antecedentesFormArr.length);
    // console.log(antecedentesArr);

    this._antecedentesEstado = antecedentesArr.includes(true);
    // console.log(this._antecedentesEstado);
  }

  // ----------------------------
  //  Metodo botones temperatura
  // ----------------------------
  cambiarTemp(valor: number) {
    // this._temperaturaGrados += valor
    // this._temperaturaGrados *= 10;
    // this._temperaturaGrados = Math.ceil(this._temperaturaGrados);
    // this._temperaturaGrados /= 10;

    let temperaturaValue = this.temperaturaValue;
    temperaturaValue += valor;
    temperaturaValue *= 10;
    temperaturaValue = Math.ceil(temperaturaValue);
    temperaturaValue /= 10;

    this.temperaturaValue = temperaturaValue;
  }
}
