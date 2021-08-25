import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Resultado } from '../../interfaces/resultado.interface';

import { UsuarioService } from '../usuario/usuario.service';
import { AutodiagnosticoService } from '../autodiagnostico/autodiagnostico.service';
import { environment } from '../../../environments/environment';
import { Autodiagnostico } from 'src/app/interfaces/autodiagnostico.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private _autodiagnostico_backend: string;

  private _resultado!: Resultado;

  get resultado(): Resultado {
    return { ...this._resultado };
  }

  constructor(private http: HttpClient,
              private _usuarioService: UsuarioService,
              private _autodiagnosticoService: AutodiagnosticoService) {
                  this._autodiagnostico_backend = environment.autodiagnostico_backend;
              }


  // -----------------------------
  //  Validar resultados grabados
  // -----------------------------
  validarResultadosGrabados() {
    if (!localStorage.getItem('temperaturaLabel')
        || !localStorage.getItem('sintomasLabel')
        || !localStorage.getItem('contactosEstrechoLabel')
        || !localStorage.getItem('antecedentesLabel')
        // || !localStorage.getItem('dosisUnoLabel')
        // || !localStorage.getItem('dosisDosLabel')
        || !localStorage.getItem('resultado')
        || !localStorage.getItem('fecha_autodiagnostico')
        || !localStorage.getItem('fecha_hasta_resultado')) {
          return of(false);
    }

    this._resultado = {
      legajo: this._usuarioService.usuario,
      temperaturaLabel: localStorage.getItem('temperaturaLabel'),
      sintomasLabel: localStorage.getItem('sintomasLabel'),
      contactosEstrechoLabel: localStorage.getItem('contactosEstrechoLabel'),
      antecedentesLabel: localStorage.getItem('antecedentesLabel'),
      // dosisUnoLabel: localStorage.getItem('dosisUnoLabel'),
      // dosisDosLabel: localStorage.getItem('dosisDosLabel'),
      resultado: (localStorage.getItem('resultado') === 'true') ? true : false,
      fecha_autodiagnostico: localStorage.getItem('fecha_autodiagnostico'),
      fecha_hasta_resultado: localStorage.getItem('fecha_hasta_resultado')
    }
    
    return of(true);
  }


  // -----------------------------------------------
  //  Obtener autodiagnostico de usuario ingresante
  // -----------------------------------------------
  obtenerAutodiagnostico(nroLegajo: string, dni: string) {
    let busqueda = '';

    if(nroLegajo) {
      busqueda += `nroLegajo=${nroLegajo}&`;
    }
    busqueda += `dni=${dni}`;

    return this.http.get<Autodiagnostico[]>(`${this._autodiagnostico_backend}/buscar?${busqueda}&pagina=1`)
      .pipe(
        tap(listaAutodiagnosticos => {
          if ( listaAutodiagnosticos.length ) {
            // console.log(listaAutodiagnosticos);
            const autodiagnostico: Autodiagnostico = listaAutodiagnosticos[0];
  
            // console.log(autodiagnostico);
  
            this._resultado = {
              legajo: this._usuarioService.usuario,
              temperaturaLabel: '!!! no se recibe !!!', // no tengo la temp aca
              sintomasLabel: `${autodiagnostico.estadoSintomas === 0 ? 'Sin' : 'Con'} síntomas`,
              contactosEstrechoLabel:  `${autodiagnostico.estadoContactoEstrecho === 0 ? 'Sin' : 'Con'} contacto estrecho`,
              antecedentesLabel:  `${autodiagnostico.estadoAntecedentes === 0 ? 'Sin' : 'Con'} antecedentes`,
              resultado: (autodiagnostico.resultado === 0) ? false : true,
              fecha_autodiagnostico: this.formatearFecha(new Date(autodiagnostico.fecha_autodiagnostico)),
              fecha_hasta_resultado: this.formatearFecha(new Date(autodiagnostico.fecha_hasta_resultado))
            }
            // this.guardarEnLocalStorage();
          }
        }),
        map(listaAutodiagnosticos => {
          if ( listaAutodiagnosticos.length ) {
            const bloqueado: boolean = !this._resultado.resultado && 
                                       (new Date(this._resultado.fecha_hasta_resultado).getTime() > new Date().getTime());
            if ( !bloqueado ) {
              // this.guardarEnLocalStorage();
            }
            return {
              ok: true,
              message: 'Se encontraron autodiagnosticos realizados',
              isAutodiagnostico: true,
              isBloqueado: bloqueado
            }
          } else {
            return {
              ok: true,
              message: 'No se encontraron autodiagnósticos realizados',
              isAutodiagnostico: false,
              isBloqueado: false
            }
          }
        }),
        catchError(err => of({
          ok: false,
          message: 'Ocurrió un error inesperado',
          isAutodiagnostico: false,
          isBloqueado: false
        }))
      );
  }

  // --------
  //  Grabar
  // --------
  grabarResultado() {
    this.crearResultado();
    // console.log('GRABAR', this._resultado);
    
    this.guardarEnLocalStorage();

    return this.http.post(`${this._autodiagnostico_backend}/legajo/autodiagnostico`, this._resultado, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap( idAutodiagnostico => {
        this.guardarEnLocalStorage();
        return of(idAutodiagnostico)
      })
      // , catchError(err => of(err))
    );
    
  }

  // -----------------------
  //  Limpiar local storage
  // -----------------------
  limpiarResultadosLocalStorage() {
    localStorage.removeItem('temperaturaLabel');
    localStorage.removeItem('sintomasLabel');
    localStorage.removeItem('contactosEstrechoLabel');
    localStorage.removeItem('antecedentesLabel');
    // localStorage.removeItem('dosisUnoLabel');
    // localStorage.removeItem('dosisDosLabel');
    localStorage.removeItem('resultado');
    localStorage.removeItem('fecha_autodiagnostico');
    localStorage.removeItem('fecha_hasta_resultado');
  }

  /* 
   * PRIVADOS
  */

  // ---------------------------------------------------
  //  Crear obj Resultado al realizar un autodiagnostico
  // ---------------------------------------------------
  private crearResultado() {
    this._resultado = {
      legajo: this._usuarioService.usuario,
      temperaturaLabel: `Mi temperatura es: ${this._autodiagnosticoService.temperaturaValue}°C`,
      sintomasLabel: `${(this._autodiagnosticoService.sintomasEstado) ? 'Con' : 'Sin'} síntomas`,
      contactosEstrechoLabel: `${(this._autodiagnosticoService.contactoEstrechoEstado) ? 'Con' : 'Sin'} contacto estrecho`,
      antecedentesLabel: `${(this._autodiagnosticoService.antecedentesEstado) ? 'Con' : 'Sin'} antecedentes`,
      // dosisUnoLabel: `${this._autodiagnosticoService.formVacunas.get('dosis1').value}`,
      // dosisDosLabel: `${this._autodiagnosticoService.formVacunas.get('dosis2').value}`,
      // temperatura: String(this._autodiagnosticoService.temperaturaValue),
      temperatura: `${this._autodiagnosticoService.temperaturaValue}°C`,
      sintomas: this.stringTokenizadoSintomas(),
      contactoEstrecho: this.stringTokenizadoContactoEstrecho(),
      antecedentes: this.stringTokenizadoAntecedentes(),
      vacunas: this.stringTokenizadoVacunas(),
      estadoSintomas: this._autodiagnosticoService.sintomasEstado,
      estadoContactoEstrecho: this._autodiagnosticoService.contactoEstrechoEstado,
      estadoAntecedentes: this._autodiagnosticoService.antecedentesEstado,

      resultado: (this._autodiagnosticoService.sintomasEstado || this._autodiagnosticoService.contactoEstrechoEstado)
                    ? false : true,
      // fecha_autodiagnostico: this.formatearFecha( new Date() ),
      fecha_autodiagnostico: this.formatearFecha( new Date() ),
      fecha_hasta_resultado: this.formatearFecha( this.calcularFechaVencimiento() ),
      // fecha_autodiagnostico: new Date().toISOString(),
      // fecha_hasta_resultado: this.calcularFechaVencimiento().toISOString(),
      comentario: null,
      modificadoPor: null,
      modificadoEn: null
    }
  }

  // --------------------
  //  Tokenizar sintomas
  // --------------------
  private stringTokenizadoSintomas() {
    const sintomasArray = this._autodiagnosticoService.sintomas.value as Array<string>;
    let stringTokenizer = '@@';

    const numIdEmpiezaSintomas = 2;

    for (let i=0; i < sintomasArray.length; i++) {
      stringTokenizer += `${i+numIdEmpiezaSintomas},${(sintomasArray[i] === 'no') ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  // -----------------------------
  //  Tokenizar contacto estrecho
  // -----------------------------
  private stringTokenizadoContactoEstrecho() {
    const contactoEstrechoArray = this._autodiagnosticoService.contactoEstrecho.value as Array<string>;
    let stringTokenizer = '@@';

    const numIdEmpiezaContactoEstrecho = 11;

    for (let i=0; i < contactoEstrechoArray.length; i++) {
      stringTokenizer += `${i+numIdEmpiezaContactoEstrecho},${(!contactoEstrechoArray[i]) ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  // ------------------------
  //  Tokenizar antecedentes
  // ------------------------
  private stringTokenizadoAntecedentes() {
    const antecedentesArray = this._autodiagnosticoService.antecedentes.value as Array<string>;
    let stringTokenizer = '@@';

    const numIdEmpiezaAntecedentes = 13;
    let idRespuesta: number;

    for (let i=0; i < antecedentesArray.length; i++) {
      idRespuesta = i+numIdEmpiezaAntecedentes;
      stringTokenizer += `${idRespuesta},${(!antecedentesArray[i]) ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  private stringTokenizadoVacunas() {
    let {dosisUno, dosisDos} = this._autodiagnosticoService.formVacunas.value;
    let stringTokenizer = '@@';

    if (dosisUno === '0' || dosisUno === 0) {
      dosisDos = '0';
    }

    stringTokenizer += `${20},${this._autodiagnosticoService.getDescripcionVacunaPorId(Number(dosisUno))}@@`;
    stringTokenizer += `${21},${this._autodiagnosticoService.getDescripcionVacunaPorId(Number(dosisDos))}@@`;

    return stringTokenizer;
  }


  // -----------------
  //  Formatear fecha
  // -----------------
  private formatearFecha(fecha: Date) {
    // console.log('FECHA RECIBIDA A FORMATEAR:', fecha.toString());

    let mesFecha = fecha.getMonth() + 1;
    // console.log('MES FECHA RECIBIDA:', mesFecha);

    let anio     = `${fecha.getFullYear()}`;
    let mes      = `${fecha.getMonth().toString().length===1 ? '0'+mesFecha : mesFecha}`;
    let dia      = `${fecha.getDate().toString().length===1 ? '0'+fecha.getDate() : fecha.getDate()}`;
    let hora     = `${fecha.getHours().toString().length===1 ? '0'+fecha.getHours() : fecha.getHours()}`;
    let minutos  = `${fecha.getMinutes().toString().length===1 ? '0'+fecha.getMinutes() : fecha.getMinutes()}`;
    let segundos = `${fecha.getSeconds().toString().length===1 ? '0'+fecha.getSeconds() : fecha.getSeconds()}`;

    // console.log(`FECHA FORMATEADA: ${ anio }-${ mes }-${ dia }T${ hora }:${ minutos }:${ segundos }`);

    return `${ anio }-${ mes }-${ dia }T${ hora }:${ minutos }:${ segundos }`;
  }

  // ----------------------------
  //  Calcular fecha vencimiento
  // ----------------------------
  private calcularFechaVencimiento() {
    let fechaVencimiento = new Date();

    if (this._autodiagnosticoService.sintomasEstado || this._autodiagnosticoService.contactoEstrechoEstado) {
      fechaVencimiento.setHours(fechaVencimiento.getHours() + 72)
    } else {
      fechaVencimiento.setHours(fechaVencimiento.getHours() + 12);
    }

    return fechaVencimiento;
  }

  // --------------------------
  //  Guardar en local storage
  // --------------------------
  private guardarEnLocalStorage() {
    localStorage.setItem('temperaturaLabel', this._resultado.temperaturaLabel);
    localStorage.setItem('sintomasLabel', this._resultado.sintomasLabel);
    localStorage.setItem('contactosEstrechoLabel', this._resultado.contactosEstrechoLabel);
    localStorage.setItem('antecedentesLabel', this._resultado.antecedentesLabel);
    // localStorage.setItem('dosisUnoLabel', this._resultado.dosisUnoLabel);
    // localStorage.setItem('dosisDosLabel', this._resultado.dosisDosLabel);
    localStorage.setItem('resultado', `${this._resultado.resultado}`);
    localStorage.setItem('fecha_autodiagnostico', this._resultado.fecha_autodiagnostico);
    localStorage.setItem('fecha_hasta_resultado', this._resultado.fecha_hasta_resultado);
  }

  // // --------------------------
  // //  BLOQUEO: Calcular fechas
  // // --------------------------
  // private calcularFechas(fecha_hasta_resultado: Date) {
  //   return
  // }
}
