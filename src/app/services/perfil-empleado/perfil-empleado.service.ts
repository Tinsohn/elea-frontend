import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap, map, concatMap } from 'rxjs/operators';

import { PerfilEmpleado } from '../../interfaces/perfil-empleado.interface';
import { PropertiesService } from '../properties/properties.service';
import { Respuesta } from '../../interfaces/respuesta.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilEmpleadoService {
  private perfilEmpleado!: PerfilEmpleado;
  // private respuetas: Respuesta[] = [];

  private perfil = {
    nroLegajo: null,
    emailUsuario: null,
    antecedentesVacunas: []
  }

  constructor(private http: HttpClient,
              private _propertiesService: PropertiesService) { }

  obtenerPerfil(nroLegajo: string) {
    // this.respuetas = [];
    this.perfil.antecedentesVacunas = [];

    // const perfil = {
    //   nroLegajo,
    //   emailUsuario: null,
    //   antecedentesVacunas: null
    // }
    this.perfil.nroLegajo = nroLegajo;
    console.log("PERFIL TEMP", this.perfil)

    /**
     * Email usuario
     */
    // TODO: obtener email

    /**
     * Respuetas
     */
    // TODO: obtener respuestas de tabla nueva de RespuestasPerfil?
    const urlEP = `/pregunta/respuestas`;
    let idPantalla = 4; // 4: antecedentes | 5: vacunas

    return this.obtenerRespuestas(idPantalla, nroLegajo)
      .pipe(
        concatMap(respAntecedentes => {
          if(respAntecedentes.ok) {
            idPantalla = 5;
            return this.obtenerRespuestas(idPantalla, nroLegajo)
          }
          return of(respAntecedentes);
        })
      );
  }


  private obtenerRespuestas(idPantalla: number, nroLegajo: string) {
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<Respuesta[]>(`${properties.autodiagnostico_backend}/pregunta/respuestas?idPantalla=${idPantalla}&nroLegajo=${nroLegajo}`)),
        tap(respuestas => {
          if(respuestas.length > 0) {
            respuestas.forEach(respuesta => {
              respuesta.idPantalla = idPantalla;
              // this.respuetas.push(respuesta);
              this.perfil.antecedentesVacunas.push(respuesta);
            });
            // perfil.antecedentesVacunas = this.respuetas
  
            // this.perfilEmpleado = perfil;
            // console.log('PERFIL CARGADO', this.perfilEmpleado);
            console.log('PERFIL CARGADO', this.perfil);
          }
        }),
        map(respuestas => {
          if(respuestas.length <= 0) {
            return {
              ok: false,
              message: 'No se encontraron antecedentes o vacunas en el perfil'
            };
          }

          return {
            ok: true,
            message: 'Antecedentes y vacunas cargadas'
          };
        }),
        catchError(err => of({
          ok: false,
          message: 'Ocurrió un error inesperado'
        }))
      );
  }
}
