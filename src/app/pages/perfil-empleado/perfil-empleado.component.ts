import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';

import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { PerfilEmpleadoService } from '../../services/perfil-empleado/perfil-empleado.service';

import { PerfilEmpleado } from '../../interfaces/perfil-empleado.interface';
import { Pregunta } from 'src/app/interfaces/pregunta.interface';
import { PreguntaRespuesta } from 'src/app/interfaces/PreguntaRespuesta.interface';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  funcion: string;

  formEmailUsuario: FormGroup;

  // private _perfilEmpleadoSubscription: Subscription;
  private _preguntasSubscription: Subscription;
  private _vacunasSubscription: Subscription;

  get formVacunas(): FormGroup {
    return this._autodiagnosticoService.formVacunas;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _rutaActiva: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _autodiagnosticoService: AutodiagnosticoService,
    private _perfilEmpleadoService: PerfilEmpleadoService) { }

  ngOnInit(): void {
    this.loading = true;

    this.funcion = this._rutaActiva.snapshot.params.funcion;

    let emailU: string;
    if (!localStorage.getItem('emailU') || localStorage.getItem('emailU') === 'null') {
      emailU = '';
    } else {
      emailU = localStorage.getItem('emailU');
    }

    this.formEmailUsuario = this.fb.group({
      emailUsuario: [emailU, [
                      Validators.required, 
                      Validators.pattern('^[_a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.][a-z0-9]+)*([\.][a-z]{2,4})$')
                    ]]

    });

    // TODO: la carga de perfil es para pruebas! (va en empleado.component)
    // obtiene perfil del empleado
    // this._perfilEmpleadoSubscription = this._perfilEmpleadoService.obtenerPerfil('369852')
    //   .subscribe();

    const obtenerPreguntas: boolean = this.funcion === 'actualizar' ? true : false

    // inicializa arrays de preguntaX
    this._preguntasSubscription = this._autodiagnosticoService.obtenerPreguntas(obtenerPreguntas)
      .subscribe();

    // inicializa array de vacunas
    this._vacunasSubscription = this._autodiagnosticoService.obtenerVacunas()
      .subscribe(()=>this.loading=false);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('perfil');

    // if(this._perfilEmpleadoSubscription) {
    //   this._perfilEmpleadoSubscription.unsubscribe();
    // }
    if(this._preguntasSubscription) {
      this._preguntasSubscription.unsubscribe();
    }
    if(this._vacunasSubscription) {
      this._vacunasSubscription.unsubscribe();
    }
  }

  submit() {
    this.loading = true;

    const perfil: PerfilEmpleado = this.crearObjPerfil();
    // console.log(perfil);

    if(this.funcion === 'crear') {

      this._perfilEmpleadoService.insertarPerfil(perfil)
        .subscribe(() => {
          this.loading = false;
          
          this.openSnackBar();

          this.router.navigate(['/ingreso']);
        }, err => {
          this.loading = false;
          this.dialog.open(DialogMensajeErrorComponent, {
            data: { msg: 'Hubo un problema al crear el perfil. Por favor, vuelva a intentarlo' }
          })
          this.router.navigate(['/ingreso']);
        });

    } else if(this.funcion === 'actualizar') {

      this._perfilEmpleadoService.actualizarPerfil(perfil).subscribe(() => {
        this.loading = false;

        this.openSnackBar();
        
        this.router.navigate(['/ingreso']);
      }, err => {
        this.loading = false;
        this.dialog.open(DialogMensajeErrorComponent, {
          data: { msg: 'Hubo un problema al actualizar el perfil. Por favor, vuelva a intentarlo' }
        })
        this.router.navigate(['/ingreso']);
      });

    }
    // this.router.navigate(['/ingreso']);
  }

  private crearObjPerfil(): PerfilEmpleado {
    const preguntasAntecedentes: Pregunta[] = this._autodiagnosticoService.preguntasAntecedentes;
    const preguntasVacunacion: Pregunta[] = this._autodiagnosticoService.preguntasVacunacion;

    const emailUsuario = this.formEmailUsuario.get('emailUsuario').value;
    const respuestasAntecedentes = this._autodiagnosticoService.formAutodiagnostico.get('antecedentes').value;
    const respuestasVacunacion = this._autodiagnosticoService.formVacunas.get('vacunas').value;

    const preguntasRespuestas: PreguntaRespuesta[] = [];

    // cargo antecedentes
    for(let i=0; i<preguntasAntecedentes.length; i++) {
      let preguntaRespuesta: PreguntaRespuesta = {
        pregunta: preguntasAntecedentes[i],
        respuesta: {
          nroLegajo: localStorage.getItem('nroLegajo'),
          idPregunta: preguntasAntecedentes[i].idPregunta,
          respuestaPregunta: respuestasAntecedentes[i] ? '1' : '0'
        }
      }
      preguntasRespuestas.push(preguntaRespuesta);
    }

    // cargo vacunacion
    for(let i=0; i<preguntasVacunacion.length; i++) {
      let preguntaRespuesta: PreguntaRespuesta = {
        pregunta: preguntasVacunacion[i],
        respuesta: {
          nroLegajo: localStorage.getItem('nroLegajo'),
          idPregunta: preguntasVacunacion[i].idPregunta,
          respuestaPregunta: respuestasVacunacion[i]
        }
      }
      preguntasRespuestas.push(preguntaRespuesta);
    }

    // console.log(preguntasRespuestas)

    return {
      nroLegajo: localStorage.getItem('nroLegajo'),
      emailUsuario,
      preguntasRespuestas,
      estadoLogico: 1
    };
  }


  volverIngreso() {
    this.router.navigate(['/ingreso']);
  }

  private openSnackBar() {
    this._snackBar.openFromComponent(PerfilCreadoMsjComponent, {
      data: { funcion: this.funcion },
      duration: 5000,
    });
  }
}


/**
 * SNACK BAR
 */
interface Data {
  funcion: string
}

@Component({
  selector: 'app-perfil-creado-msj-component',
  template: `<span class="msj">
              Perfil {{data.funcion === 'crear' ? 'creado' : 'actualizado'}} correctamente.
            </span>`,
  styles: [`
    .msj {
      text-align: center;
      color: green;
    }
  `],
})
export class PerfilCreadoMsjComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Data){}
}