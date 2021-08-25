import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ParametrosService } from '../parametros/parametros.service';
import { Pregunta } from 'src/app/interfaces/pregunta.interface';
import { Vacuna } from 'src/app/interfaces/vacuna.interface';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService implements OnInit {
  private autodiagnostico_backend: string = environment.autodiagnostico_backend;
  private _tempMin: number;
  private _tempMax: number;
  private _vacunas: Vacuna[] = [];

  // --------
  //  CAMPOS
  // --------
  // Campos: Form
  private _formAutodiagnostico: FormGroup = this.fb.group({
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
    contactoEstrecho: this.fb.array([
      [false],
      [false]
    ]),
    antecedentes: this.fb.array([
      [false],
      [false],
      [false],
      [false],
      [false],
      [false],
      [false]
    ]),
  });

  private _formVacunas: FormGroup = this.fb.group({
    dosisUno: [ '0' ],
    dosisDos: [ '0' ]
  }, {
    validators: [ this.fechaDesdeMenorAHasta('dosisUno', 'dosisDos') ]
  });

  // Campos: Estados
  private _sintomasEstado        : boolean = false;
  private _contactoEstrechoEstado: boolean = false;
  private _antecedentesEstado    : boolean = false;

  // Preguntas: Leyendas sintomas y antecedentes
  txtPreguntaTemperatura: string = '¿Cuál es tu temperatura corporal actual?';
  txtPreguntasSintomas: string[] = [
    // "¿Percibiste una marcada pérdida del olfato de manera repentina?",
    // "¿Percibiste una marcada pérdida del gusto (sabor de los alimentos) de manera repentina?",
    // "¿Tenés tos?",
    // "¿Tenés dolor de garganta?",
    // "¿Tenés dificultad respiratoria o falta de aire?",
    // "¿Tenés dolor de cabeza?",
    // "¿Tenés diarrea?",
    // "¿Tenés vómitos?",
    // "¿Tenés dolor muscular?",
  ];
  txtPreguntasContactoEstrecho: string [] = [
    // "Trabajo o convivo con una persona que actualmente es caso confirmado o sospechoso de COVID-19.",
    // "Pasé en los últimos 14 días al menos 15 minutos sin barbijo y a menos de 2 metros de distancia de una persona que actualmente es caso confirmado de COVID-19."
  ]
  txtPreguntasAntecedentes: string[] = [
    // "Tengo/tuve cáncer.",
    // "Tengo diabetes.",
    // "Tengo alguna enfermedad hepática.",
    // "Tengo enfermedad renal crónica.",
    // "Tengo alguna enfermedad respiratoria.",
    // "Tengo alguna enfermedad cardiológica.",
    // "Tengo alguna condición que baja las defensas."
  ];
  txtPreguntasVacunacion: string[] = [
    // "Tengo aplicada la vacuna del COVID-19 1era dosis.",
    // "Tengo aplicada la vacuna del COVID-19 2da dosis."
  ]

  // ---------
  //  GETTERS
  // ---------
  // Getters: Form
  get formAutodiagnostico(): FormGroup {
    return this._formAutodiagnostico;
  }
  get formVacunas(): FormGroup {
    return this._formVacunas;
  }

  get temperatura(): FormControl {
    return this._formAutodiagnostico.get('temperatura') as FormControl;
  }
  get sintomas(): FormArray {
    return this._formAutodiagnostico.get('sintomas') as FormArray;
  }
  get contactoEstrecho(): FormArray {
    return this._formAutodiagnostico.get('contactoEstrecho') as FormArray;
  }
  get antecedentes(): FormArray {
    return this._formAutodiagnostico.get('antecedentes') as FormArray;
  }
  // Getter y setter: valores de temperatura
  get temperaturaValue(): number {
    return this._formAutodiagnostico.get('temperatura').value;
  }
  // set temperaturaValue(temperaturaValue: number) {
  //   this._formAutoevaluacion.get('temperatura').setValue(temperaturaValue);
  // }

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

  get vacunas(): Vacuna[] {
    return this._vacunas;
  }

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private parametrosService: ParametrosService) {}

  ngOnInit(): void {
    // this.obtenerRangoTemperatura();
  }

  obtenerPreguntas() {
    this.txtPreguntasSintomas = [];
    this.txtPreguntasContactoEstrecho = [];
    this.txtPreguntasAntecedentes = [];
    this.txtPreguntasVacunacion = [];

    return this.http.get<Pregunta[]>(`${this.autodiagnostico_backend}/pregunta`)
      .pipe(
        tap(preguntas => {
          preguntas.forEach(pregunta => {
            switch (pregunta.idPantalla) {
              case 1:
                this.txtPreguntaTemperatura = pregunta.descripcionPregunta;
                break;
              case 2:
                this.txtPreguntasSintomas.push(pregunta.descripcionPregunta);
                break;
              case 3:
                this.txtPreguntasContactoEstrecho.push(pregunta.descripcionPregunta);
                break;
              case 4:
                if (pregunta.idOrdenEnPantalla === 7 || pregunta.idOrdenEnPantalla === 8) {
                  this.txtPreguntasVacunacion.push(pregunta.descripcionPregunta)
                } else {
                  this.txtPreguntasAntecedentes.push(pregunta.descripcionPregunta);
                }
                break;
            }
          })
        })
      );
  }

  obtenerVacunas() {
    this._vacunas = [];
    
    return this.http.get<Vacuna[]>(`${this.autodiagnostico_backend}/vacuna/`)
      .pipe(
        tap(vacunas => {
          vacunas.forEach(vacuna => {
            if (vacuna.estadoLogico === 1) {
              this._vacunas.push(vacuna);
            }
          });
          // this._vacunas = vacunas;
        })
      );
  }

  getDescripcionVacunaPorId(idVacuna: number): string {
    if (idVacuna === 0) {
      return 'Ninguna';
    }
    return this._vacunas.filter(vacuna => vacuna.idVacuna === idVacuna)[0].descripcionVacuna;
  }

  // ----------
  //  Resetear
  // ----------
  reset(): void {
    this.resetTemperatura();
    this.resetSintomas();
    this.resetContactoEstrecho();
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
  private resetContactoEstrecho() {
    this.contactoEstrecho.reset([
      false,
      false
    ])
  }
  private resetAntecedentes() { // TODO: resetear por los valores tomados del ult autodiagnostico
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
    if (this.temperaturaValue < this._tempMin
        || this.temperaturaValue > this._tempMax) {
        this._sintomasEstado = true;
      } else {
        // sintomas
        let sintomasArray = this.sintomas.value as Array<string>;

        this._sintomasEstado = sintomasArray.includes('si');
      }
  }

  validarContactoEstrechoEstado(): void {
    const contactoEstrechoFormArr = this.contactoEstrecho.value as Array<boolean>;

    this._contactoEstrechoEstado = contactoEstrechoFormArr.includes(true);
    // console.log(this._contactoEstrechoEstado);
  }

  validarAntecedentesEstado(): void {
    let antecedentesFormArr = this.antecedentes.value as Array<boolean>;

    this._antecedentesEstado = antecedentesFormArr.includes(true);
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

    this._formAutodiagnostico.get('temperatura').setValue(temperaturaValue);
    // this.temperaturaValue = temperaturaValue;
  }

  obtenerRangoTemperatura() {
    return this.parametrosService.getParametros()
      .subscribe(parametros => {
        this._tempMin = Number(parametros[0].valorParametro);
        this._tempMax = Number(parametros[1].valorParametro);
      })
  }


  /**
   * Validacion vacunas
   */
  private fechaDesdeMenorAHasta( dosisUno: string, dosisDos: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const dosisUnoValue = formGroup.get(dosisUno)?.value;
      const dosisDosValue = formGroup.get(dosisDos)?.value;
      
      if (dosisUnoValue === '0' && dosisDosValue !== '0') {
        return {
          sinDosisUno: true
        }
      }

      return null;
    }
  }
}
