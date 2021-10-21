import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';


import { PropertiesService } from '../properties/properties.service';
import { ParametrosService } from '../parametros/parametros.service';
import { Pregunta } from 'src/app/interfaces/pregunta.interface';
import { Vacuna } from 'src/app/interfaces/vacuna.interface';
import { PerfilEmpleadoService } from '../perfil-empleado/perfil-empleado.service';
import { PreguntaRespuesta } from '../../interfaces/PreguntaRespuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService implements OnInit {
  // private autodiagnostico_backend: string = environment.autodiagnostico_backend;
  private _tempMin: number;
  private _tempMax: number;
  private _vacunas: Vacuna[] = [];

  // --------
  //  CAMPOS
  // --------
  // Campos: Form
  // private _formAutodiagnostico: FormGroup;
  private _formAutodiagnostico: FormGroup = this.fb.group({
    temperatura: [37],
    sintomas: this.fb.array([
      ['no'],
      // ['no'],
      // ['no'],
      // ['no'],
      // ['no'],
      // ['no'],
      // ['no'],
      // ['no'],
      // ['no']
    ]),
    contactoEstrecho: this.fb.array([
      [false],
      [false]
    ]),
    antecedentes: this.fb.array([
      [false],
      // [false],
      // [false],
      // [false],
      // [false],
      // [false],
      // [false]
    ]),
  });

  private arrSintomas        : string[] = [];
  private arrContactoEstrecho: boolean[] = [];
  private arrAntecedentes    : boolean[] = [];

  // private _formVacunas: FormGroup = this.fb.group({
  //   dosisUno: [ '0' ],
  //   dosisDos: [ '0' ]
  // }, {
  //   validators: [ this.validacionVacunas('dosisUno', 'dosisDos') ]
  // });
  private _formVacunas: FormGroup = this.fb.group({
    vacunas: this.fb.array(['0'], this.validacionVacunas)
  });
  private arrVacunacion: string [] = [];

  // Campos: Estados
  private _sintomasEstado        : boolean = false;
  private _contactoEstrechoEstado: boolean = false;
  private _antecedentesEstado    : boolean = false;

  // Preguntas: Leyendas sintomas y antecedentes
  preguntaTemperatura!: Pregunta;
  txtPreguntaTemperatura: string = '¿Cuál es tu temperatura corporal actual?';
  preguntasSintomas: Pregunta[] = [];
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
  preguntasContactoEstrecho: Pregunta[] = [];
  txtPreguntasContactoEstrecho: string [] = [
    // "Trabajo o convivo con una persona que actualmente es caso confirmado o sospechoso de COVID-19.",
    // "Pasé en los últimos 14 días al menos 15 minutos sin barbijo y a menos de 2 metros de distancia de una persona que actualmente es caso confirmado de COVID-19."
  ]
  preguntasAntecedentes: Pregunta[] = [];
  txtPreguntasAntecedentes: string[] = [
    // "Tengo/tuve cáncer.",
    // "Tengo diabetes.",
    // "Tengo alguna enfermedad hepática.",
    // "Tengo enfermedad renal crónica.",
    // "Tengo alguna enfermedad respiratoria.",
    // "Tengo alguna enfermedad cardiológica.",
    // "Tengo alguna condición que baja las defensas."
  ];
  preguntasVacunacion: Pregunta[] = [];
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
  get vacunasFormField(): FormArray {
    return this._formVacunas.get('vacunas') as FormArray;
  }
  // Getter y setter: valores de temperatura
  get temperaturaValue(): number {
    return this._formAutodiagnostico.get('temperatura')?.value;
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
              private _propertiesService: PropertiesService,
              private _parametrosService: ParametrosService,
              private _perfilEmpleadoService: PerfilEmpleadoService) {}

  ngOnInit(): void {
    // this.obtenerRangoTemperatura();
  }

  obtenerPreguntas(cargarRespuestasEmpleado = false) {
    // this.txtPreguntasSintomas = [];
    this.preguntasSintomas = [];

    // this.txtPreguntasContactoEstrecho = [];
    this.preguntasContactoEstrecho = [];

    // this.txtPreguntasAntecedentes = [];
    this.preguntasAntecedentes = [];

    // this.txtPreguntasVacunacion = [];
    this.preguntasVacunacion = [];

    // return this.http.get<Pregunta[]>(`${this.autodiagnostico_backend}/pregunta`)
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<Pregunta[]>(`${properties.autodiagnostico_backend}/pregunta`)),
        // tap(preguntas => {
        tap(preguntas => {

          // let arrSintomas: string[] = [];
          // let arrContactoEstrecho: boolean[] = [];
          // let arrAntecedentes: boolean[] = [];
          this.arrSintomas = [];
          this.arrContactoEstrecho = [];
          this.arrAntecedentes = [];
          this.arrVacunacion = [];

          preguntas.forEach(pregunta => {
            // console.log(pregunta);
            if(pregunta.estadoLogico === 1) {

              switch (pregunta.idPantalla) {
                case 1:
                  // this.preguntaTemperatura = pregunta;
                  this.txtPreguntaTemperatura = pregunta.descripcionPregunta;
                  break;
                case 2:
                    this.preguntasSintomas.push(pregunta);
                    // this.txtPreguntasSintomas.push(pregunta.descripcionPregunta);
                    this.arrSintomas.push('no');
                    // this.arrSintomas.push(`${ pregunta.idPregunta },0`);
                  break;
                case 3:
                  this.preguntasContactoEstrecho.push(pregunta);
                  // this.txtPreguntasContactoEstrecho.push(pregunta.descripcionPregunta);
                  this.arrContactoEstrecho.push(false);
                  break;
                case 4:
                  // if (pregunta.idOrdenEnPantalla === 7 || pregunta.idOrdenEnPantalla === 8) {
                  //   // this.preguntasVacunacion.push(pregunta);
                  //   this.txtPreguntasVacunacion.push(pregunta.descripcionPregunta);
                  // } else {
                  //   // this.preguntasAntecedentes.push(pregunta);
                  //   this.txtPreguntasAntecedentes.push(pregunta.descripcionPregunta);
                  //   this.arrAntecedentes.push(false);
                  // }
                  this.preguntasAntecedentes.push(pregunta);
                  // this.txtPreguntasAntecedentes.push(pregunta.descripcionPregunta);
                  this.arrAntecedentes.push(false);
                break;
                case 5:
                  this.preguntasVacunacion.push(pregunta);
                  // this.txtPreguntasVacunacion.push(pregunta.descripcionPregunta);
                  this.arrVacunacion.push('0');
                  break;
              }
            }
          })

          if(cargarRespuestasEmpleado) {
            this.cargarRespuestasEmpleado()
          }

          this._formAutodiagnostico = this.fb.group({
            temperatura: [37],
            sintomas: this.fb.array(this.arrSintomas),
            contactoEstrecho: this.fb.array(this.arrContactoEstrecho),
            antecedentes: this.fb.array(this.arrAntecedentes),
          });


          this._formVacunas = this.fb.group({
            vacunas: this.fb.array(this.arrVacunacion)
          },{
            validators: [ this.validacionVacunas() ]
          });
        })
      );
  }

  obtenerVacunas() {
    this._vacunas = [];
    
    // return this.http.get<Vacuna[]>(`${this.autodiagnostico_backend}/vacuna/`)
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<Vacuna[]>(`${properties.autodiagnostico_backend}/vacuna/`)),
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


  cargarRespuestasEmpleado() {
    // console.log(this._perfilEmpleadoService.perfil)
    if(this._perfilEmpleadoService.perfil) {
      this.arrAntecedentes = [];
      this.arrVacunacion = [];

      // const perfil = this._perfilEmpleadoService.perfil;
      const perfil = JSON.parse(localStorage.getItem('perfil'));

      perfil.preguntasRespuestas.forEach(preguntaRespuesta => {
        if(preguntaRespuesta.pregunta.idPantalla === 4) {
          if (!preguntaRespuesta.respuesta || preguntaRespuesta.respuesta.respuestaPregunta === '0') {
            this.arrAntecedentes.push(false);
          } else if ( preguntaRespuesta.respuesta.respuestaPregunta === '1' ) {
            this.arrAntecedentes.push(true);
          }
        } else if(preguntaRespuesta.pregunta.idPantalla === 5) {
          if (!preguntaRespuesta.respuesta || preguntaRespuesta.respuesta.respuestaPregunta === '0') {
            this.arrVacunacion.push('0');
          } else {
            this.arrVacunacion.push(preguntaRespuesta.respuesta.respuestaPregunta);
          }
        }
      });
      // console.log(this.arrAntecedentes);
      // console.log(this.arrVacunacion);
    }
  }


  getDescripcionVacunaPorId(idVacuna: number, index: number): string {
    // if (idVacuna === 0 || this.formVacunas.get('dosisUno')?.value === '0') {
    if (idVacuna === 0) {
      return 'Ninguna';
    }

    // por si no carga las vacunas cuando ya se las obtiene antes por el perfil
    if(this._vacunas.length < 1) {
      return 'Ninguna';
    }

    if(this.dosisAnteriorNula(index)) {
      return 'Ninguna'
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
    if(localStorage.getItem('nroLegajo') && localStorage.getItem('nroLegajo') === '0') {
      this.resetAntecedentes();
      this.resetVacunas();
    }

    this._sintomasEstado         = false;
    this._contactoEstrechoEstado = false;
    this._antecedentesEstado     = false;
  }

  private resetTemperatura() {
    this.temperatura.reset(37)
  }
  private resetSintomas() {
    // this.sintomas.reset([
    //   'no',
    //   'no',
    //   'no',
    //   'no',
    //   'no',
    //   'no',
    //   'no',
    //   'no',
    //   'no'
    // ]);
    this.sintomas.reset(this.arrSintomas);
  }
  private resetContactoEstrecho() {
    // this.contactoEstrecho.reset([
    //   false,
    //   false
    // ]);
    this.contactoEstrecho.reset(this.arrContactoEstrecho)
  }
  private resetAntecedentes() { // TODO: resetear por los valores tomados del ult autodiagnostico
    // this.antecedentes.reset([
    //   false,
    //   false,
    //   false,
    //   false,
    //   false,
    //   false,
    //   false,
    //   false,
    //   false
    // ]);
    this.antecedentes.reset(this.arrAntecedentes);
  }
  private resetVacunas() {
    this.vacunasFormField.reset(this.arrVacunacion);
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
    return this._parametrosService.getParametros()
      .subscribe(parametros => {
        this._tempMin = Number(parametros[0].valorParametro);
        this._tempMax = Number(parametros[1].valorParametro);
      })
  }


  /**
   * Validacion vacunas
   */
  // private validacionVacunas( dosisUno: string, dosisDos: string ) {
  //   return ( formGroup: AbstractControl ): ValidationErrors | null => {
  //     const dosisUnoValue = formGroup.get(dosisUno)?.value;
  //     const dosisDosValue = formGroup.get(dosisDos)?.value;
      
  //     if (dosisUnoValue === '0' && dosisDosValue !== '0') {
  //       return {
  //         sinDosisUno: true
  //       }
  //     }

  //     return null;
  //   }
  // }

  private validacionVacunas( ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      if (this.vacunasHelper()) {
        return {
          sinDosisAnterior: true
        }
      }

      return null;
    }
  }

  // Método que verifica cuando no se selecciona ninguna vacuna en dosis anteriores
  // a las dosis que sí tienen seleccionada alguna vacuna
  private vacunasHelper() {
    const vacunas = this.formVacunas.get('vacunas')?.value;
    // console.log(vacunas)
    
    let flag: boolean = false;
    let valorAnterior = '0';

    if (vacunas.length > 0) {
      for(let i=0; i<vacunas.length; i++) {
        if(!flag) {
          flag = true;
          valorAnterior = vacunas[i];
        } else {
          // if(valorAnterior === '0' && vacunas[i] !== '0') {
          if(valorAnterior === '0' && vacunas[i] !== '0') {
            return true;
          } else {
            valorAnterior = vacunas[i];
          }
        }
      }
    }
    return false;
  }

  private dosisAnteriorNula(index: number): boolean {
    const vacunas = this.formVacunas.get('vacunas')?.value;
    
    let flag: boolean = false;
    let valorAnterior = '0';

    if (vacunas.length > 0) {
      for(let i=0; i<index; i++) {
        if(!flag) {
          flag = true;
          valorAnterior = vacunas[i];
        } else {
          // if(valorAnterior === '0' && vacunas[i] !== '0') {
          if(valorAnterior === '0' && vacunas[i] !== '0') {
            return true;
          } else {
            valorAnterior = vacunas[i];
          }
        }
      }
    }

    return false
  }
}
