import { Injectable } from '@angular/core';
import { Resultado } from '../../interfaces/resultado.interface';
import { UsuarioService } from '../usuario/usuario.service';
import { AutodiagnosticoService } from '../autodiagnostico/autodiagnostico.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private baseUrl: string = environment.baseUrlBE

  private _resultado!: Resultado;

  get resultado(): Resultado {
    return { ...this._resultado };
  }

  constructor(private http: HttpClient,
              private _usuarioService: UsuarioService,
              private _autodiagnosticoService: AutodiagnosticoService) { }


  // -----------------------------
  //  Validar resultados grabados
  // -----------------------------
  validarResultadosGrabados() {
    if (!localStorage.getItem('temperaturaLabel')
        || !localStorage.getItem('sintomasLabel')
        || !localStorage.getItem('contactoEstrechoLabel')
        || !localStorage.getItem('antecedentesLabel')
        || !localStorage.getItem('resultado')
        || !localStorage.getItem('fecha_autodiagnostico')
        || !localStorage.getItem('fecha_hasta_resultado')) {
          return of(false);
    }

    this._resultado = {
      legajo: this._usuarioService.usuario,
      temperaturaLabel: localStorage.getItem('temperaturaLabel'),
      sintomasLabel: localStorage.getItem('sintomasLabel'),
      contactoEstrechoLabel: localStorage.getItem('contactoEstrechoLabel'),
      antecedentesLabel: localStorage.getItem('antecedentesLabel'),
      resultado: (localStorage.getItem('resultado') === 'true') ? true : false,
      fecha_autodiagnostico: localStorage.getItem('fecha_autodiagnostico'),
      fecha_hasta_resultado: localStorage.getItem('fecha_hasta_resultado')
    }
    
    return of(true);
  }

  // --------
  //  Grabar
  // --------
  grabarResultado() {
    this.crearResultado();
    console.log('GRABAR', this._resultado);
    
    this.guardarEnLocalStorage();

    return this.http.post(`${this.baseUrl}/legajo/autodiagnostico`, this._resultado, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap( () => {
        this.guardarEnLocalStorage();
        console.log('grabando service');
        return of(true)}
      )
      // , catchError(err => of(err))
    );
    
  }

  // -----------------------
  //  Limpiar local storage
  // -----------------------
  limpiarResultadosLocalStorage() {
    localStorage.removeItem('temperaturaLabel');
    localStorage.removeItem('sintomasLabel');
    localStorage.removeItem('contactoEstrechoLabel');
    localStorage.removeItem('antecedentesLabel');
    localStorage.removeItem('resultado');
    localStorage.removeItem('fecha_autodiagnostico');
    localStorage.removeItem('fecha_hasta_resultado');
  }

  /* 
   * PRIVADOS
  */

  // ---------------------
  //  Crear obj Resultado
  // ---------------------
  private crearResultado() {
    this._resultado = {
      legajo: this._usuarioService.usuario,
      temperaturaLabel: `Mi temperatura es: ${this._autodiagnosticoService.temperaturaValue}°`,
      sintomasLabel: `${(this._autodiagnosticoService.sintomasEstado) ? 'Con' : 'Sin'} síntomas`,
      contactoEstrechoLabel: `${(this._autodiagnosticoService.contactoEstrechoEstado) ? 'Con' : 'Sin'} contacto estrecho`,
      antecedentesLabel: `${(this._autodiagnosticoService.antecedentesEstado) ? 'Con' : 'Sin'} antecedentes`,
      temperatura: String(this._autodiagnosticoService.temperaturaValue),
      sintomas: this.stringTokenizadoSintomas(),
      antecedentes: this.stringTokenizadoAntecedentes(),
      sintomasEstado: this._autodiagnosticoService.sintomasEstado,
      contactoEstrechoEstado: this._autodiagnosticoService.contactoEstrechoEstado,
      antecedentesEstado: this._autodiagnosticoService.antecedentesEstado,

      resultado: (this._autodiagnosticoService.sintomasEstado || this._autodiagnosticoService.contactoEstrechoEstado)
                    ? false : true,
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

    for (let i=0; i < sintomasArray.length; i++) {
      stringTokenizer += `${i+2},${(sintomasArray[i] === 'no') ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  // ------------------------
  //  Tokenizar antecedentes
  // ------------------------
  private stringTokenizadoAntecedentes() {
    const antecedentesArray = this._autodiagnosticoService.antecedentes.value as Array<string>;
    let stringTokenizer = '@@';

    for (let i=0; i < antecedentesArray.length; i++) {
      stringTokenizer += `${i+11},${(!antecedentesArray[i]) ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }


  // -----------------
  //  Formatear fecha
  // -----------------
  private formatearFecha(fecha: Date) {
    let anio = `${fecha.getFullYear()}`;
    let mes = `${fecha.getMonth().toString().length===1 ? '0'+fecha.getMonth() : fecha.getMonth()}`;
    let dia = `${fecha.getDate().toString().length===1 ? '0'+fecha.getDate() : fecha.getDate()}`;
    let hora = `${fecha.getHours().toString().length===1 ? '0'+fecha.getHours() : fecha.getHours()}`;
    let minutos = `${fecha.getMinutes().toString().length===1 ? '0'+fecha.getMinutes() : fecha.getMinutes()}`;
    let segundos = `${fecha.getSeconds().toString().length===1 ? '0'+fecha.getSeconds() : fecha.getSeconds()}`;


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
    localStorage.setItem('contactoEstrechoLabel', this._resultado.contactoEstrechoLabel);
    localStorage.setItem('antecedentesLabel', this._resultado.antecedentesLabel);
    localStorage.setItem('resultado', `${this._resultado.resultado}`);
    localStorage.setItem('fecha_autodiagnostico', this._resultado.fecha_autodiagnostico);
    localStorage.setItem('fecha_hasta_resultado', this._resultado.fecha_hasta_resultado);
  }
}
