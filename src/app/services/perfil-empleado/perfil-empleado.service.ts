import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap, tap, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PropertiesService } from '../properties/properties.service';
import { PerfilEmpleado } from '../../interfaces/perfil-empleado.interface';
import { PreguntaRespuesta } from 'src/app/interfaces/PreguntaRespuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilEmpleadoService {
  // private perfilEmpleado!: PerfilEmpleado;
  // private respuetas: Respuesta[] = [];

  // private perfilIncompleto: boolean = false;

  private _perfil: PerfilEmpleado;
  // private _perfil: PerfilEmpleado = {
  //   nroLegajo: null,
  //   emailUsuario: null,
  //   // antecedentesVacunas: []
  //   preguntasRespuestasAntecedentes: [],
  //   preguntasRespuestasVacunas: []
  // }

  get perfil(): PerfilEmpleado {
    return {...this._perfil};
  }

  constructor(private http: HttpClient,
              private _propertiesService: PropertiesService) { }

  cargarPerfil(nroLegajo: string) {
    let perfilIncompleto: boolean = false;

    return this._propertiesService.obtenerProperties()
    .pipe(
      switchMap(properties => this.http.get<PerfilEmpleado>(`${properties.autodiagnostico_backend}/perfilEmpleado/${nroLegajo}`)),
      tap(perfil => {
        // if(perfil) {
          this._perfil = perfil;
          // console.log(this._perfil)
        // }
      }),
      map(perfil => {
        // console.log(perfil)
        if(!perfil) {
          return {
            ok: true,
            existePerfil: false,
            perfilIncompleto: true,
            message: 'No se encontró ningún perfil, por favor cree uno.'
          }
        }

        if(!perfil.emailUsuario || perfil.preguntasRespuestas.length < 1) {
          perfilIncompleto = true;
        }
        if(perfil.emailUsuario) {
          localStorage.setItem('emailU', perfil.emailUsuario);
        }

        // perfil.preguntasRespuestas.forEach(preguntaRespuesta => {
        //   if (!preguntaRespuesta.respuesta) {
        //     perfilIncompleto = true;
        //   }
        // })
        for (let i=0; i<perfil.preguntasRespuestas.length; i++) {
          if (!perfil.preguntasRespuestas[i].respuesta) {
            perfilIncompleto = true;
            break;
          }
        }

        if (perfilIncompleto) {
          return {
            ok: true,
            existePerfil: true,
            perfilIncompleto: true,
            message: 'Se han creado nuevos campos del perfil, por favor complételos.'
          }
        }

        return {
          ok: true,
          existePerfil: true,
          perfilIncompleto: false,
          message: 'Se ha cargado el perfil correctamente.'
        }
      }),
      catchError(() => of({
          ok: false,
          existePerfil: false,
          perfilIncompleto: false,
          message: 'Ocurrió un error inesperado.'
        })
      )
    );
  }

  actualizarPerfil(perfil: PerfilEmpleado) {
    // console.log('actualizar');
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.put(`${properties.autodiagnostico_backend}/perfilEmpleado/`, perfil, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }))
      );
  }

  insertarPerfil(perfil: PerfilEmpleado) {
    // console.log('insertar');
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.post(`${properties.autodiagnostico_backend}/perfilEmpleado/`, perfil, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }))
      );
  }


  guardarPefilLocalStorage() {
    localStorage.setItem('perfil', JSON.stringify( this._perfil ));
  }
  obtenerPerfilLocalStorage() {
    this._perfil = JSON.parse(localStorage.getItem('perfil'));
  }


  verificarPerfil(): Observable<boolean> {
    if (!localStorage.getItem('perfil') || !localStorage.getItem('nroLegajo')) {
      return of(false); 
    } else {
      this.obtenerPerfilLocalStorage();

      return of(true); 
    }
  }

  // cargarRespuestas(nroLegajo: string) {
  //   // this.respuetas = [];
  //   // this._perfil.antecedentesVacunas = [];
  //   //////////////////
  //   // this._perfil.preguntasRespuestasAntecedentes = [];
  //   // this._perfil.preguntasRespuestasVacunas = [];
  //   //////////////////

  //   // const perfil = {
  //   //   nroLegajo,
  //   //   emailUsuario: null,
  //   //   antecedentesVacunas: null
  //   // }
  //   this._perfil.nroLegajo = nroLegajo;

  //   // TODO: obtener respuestas de tabla nueva de RespuestasPerfil?
  //   let idPantalla = 4; // 4: antecedentes | 5: vacunas

  //   return this.obtenerRespuestas(idPantalla, nroLegajo)
  //     .pipe(
  //       concatMap(respAntecedentes => {
  //         if(respAntecedentes.ok) {
  //           idPantalla = 5;
  //           return this.obtenerRespuestas(idPantalla, nroLegajo)
  //         }
  //         return of(respAntecedentes);
  //       })
  //     );
  // }


  // private obtenerRespuestas(idPantalla: number, nroLegajo: string) {
  //   return this._propertiesService.obtenerProperties()
  //     .pipe(
  //       switchMap(properties => this.http.get<PreguntaRespuesta[]>(`${properties.autodiagnostico_backend}/pregunta/respuestas?idPantalla=${idPantalla}&nroLegajo=${nroLegajo}`)),
  //       tap(listPreguntaRespuesta => {
  //         if(listPreguntaRespuesta.length > 0) {
  //           listPreguntaRespuesta.forEach(preguntaRespuesta => {
  //             if(preguntaRespuesta.respuesta) {
  //               preguntaRespuesta.respuesta.idPantalla = idPantalla;
  //             }
  //             // this.respuetas.push(respuesta);

  //             // this._perfil.antecedentesVacunas.push(respuesta);
  //             if(idPantalla === 4) {
  //               //////////////
  //               // this._perfil.preguntasRespuestasAntecedentes.push(preguntaRespuesta);
  //               //////////////
  //             } else if(idPantalla === 5) {
  //               //////////////
  //               // this._perfil.preguntasRespuestasVacunas.push(preguntaRespuesta);
  //               //////////////
  //             }
  //           });
  //           console.log('CARGA PREGUNTASRESPUESTAS', this._perfil)
  //         }
  //       }),
  //       map(listPreguntaRespuesta => {
  //         if(listPreguntaRespuesta.length <= 0) {
  //           return {
  //             ok: false,
  //             perfilIncompleto: true,
  //             message: 'No se encontraron antecedentes o vacunas en el perfil'
  //           };
  //         }

  //         listPreguntaRespuesta.forEach(preguntaRespuesta => {
  //           if (!preguntaRespuesta.respuesta) {
  //             this.perfilIncompleto = true;
  //           }
  //         });

  //         return {
  //           ok: true,
  //           perfilIncompleto: this.perfilIncompleto,
  //           message: 'Antecedentes y vacunas cargadas'
  //         };
  //       }),
  //       catchError(err => of({
  //         ok: false,
  //         perfilIncompleto: true,
  //         message: 'Ocurrió un error inesperado.'
  //       }))
  //     );
  // }

  // cargarEmailUsuario(emailU: string) {
  //   this._perfil.emailUsuario = emailU;
  // }

  // obtenerRespuestaById(idPregunta: number, idPantalla: number) {
  //   if(idPantalla === 4) {
      
  //   }
  // }
}
