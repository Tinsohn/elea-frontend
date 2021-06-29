import { Injectable } from '@angular/core';
import { Resultado } from '../../interfaces/resultado.interface';
import { UsuarioService } from '../usuario/usuario.service';
import { AutodiagnosticoService } from '../autodiagnostico/autodiagnostico.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private _resultado!: Resultado;

  get resultado(): Resultado {
    return { ...this._resultado };
  }

  constructor(private http: HttpClient,
              private _usuarioService: UsuarioService,
              private _autodiagnosticoService: AutodiagnosticoService) { }


  grabarResultado() {
    this.crearResultado();
    console.log('GRABAR',this._resultado);

    // localStorage.setItem('autoevaluacion_grabada', 'true');
  }

  private crearResultado() {
    this._resultado = {
      legajo: this._usuarioService.usuario,
      temperaturaLabel: `Mi temperatura es: ${this._autodiagnosticoService.temperaturaValue}`,
      sintomasLabel: `${(this._autodiagnosticoService.sintomasEstado) ? 'Con' : 'Sin'} síntomas`,
      contactoEstrechoLabel: `${(this._autodiagnosticoService.contactoEstrechoEstado) ? 'Con' : 'Sin'} contacto estrecho`,
      antecedentesLabel: `${(this._autodiagnosticoService.antecedentesEstado) ? 'Con' : 'Sin'} antecedentes`,
      temperatura: String(this._autodiagnosticoService.temperaturaValue),
      sintomas: this.stringTokenizadoSintomas(),
      antecedentes: this.stringTokenizadoAntecedentes(),
      estadoSintomas: this._autodiagnosticoService.sintomasEstado,
      estadoContactoEstrecho: this._autodiagnosticoService.contactoEstrechoEstado,
      estadoAntecedentes: this._autodiagnosticoService.antecedentesEstado,

      resultado: (this._autodiagnosticoService.sintomasEstado || this._autodiagnosticoService.contactoEstrechoEstado)
                    ? false : true,
      fecha_autodiagnostico: new Date(),
      fecha_hasta_resultado: this.calcularFechaVencimiento(),
      comentario: null,
      modificadoPor: null,
      modificadoEn: null
    }

    this.guardarEnLocalStorage();
  }

  private stringTokenizadoSintomas() {
    const sintomasArray = this._autodiagnosticoService.sintomas.value as Array<string>;
    let stringTokenizer = '@@';

    for (let i=0; i < sintomasArray.length; i++) {
      stringTokenizer += `${i},${(sintomasArray[i] === 'no') ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  private stringTokenizadoAntecedentes() {
    const antecedentesArray = this._autodiagnosticoService.antecedentes.value as Array<string>;
    let stringTokenizer = '@@';

    for (let i=0; i < antecedentesArray.length; i++) {
      stringTokenizer += `${i},${(!antecedentesArray[i]) ? '0' : '1'}@@`;
    }

    return stringTokenizer;
  }

  private calcularFechaVencimiento() {
    let cantDias = (this._autodiagnosticoService.sintomasEstado || this._autodiagnosticoService.contactoEstrechoEstado) ? 3 : 1;
    let fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + cantDias);

    return fechaVencimiento;
  }


  private guardarEnLocalStorage() {
    localStorage.setItem('temperaturaLabel', this._resultado.temperaturaLabel);
    localStorage.setItem('sintomasLabel', this._resultado.sintomasLabel);
    localStorage.setItem('contactoEstrechoLabel', this._resultado.contactoEstrechoLabel);
    localStorage.setItem('antecedentesLabel', this._resultado.antecedentesLabel);
    localStorage.setItem('resultado', `${this._resultado.resultado}`);
    localStorage.setItem('fecha_autodiagnostico', this._resultado.fecha_autodiagnostico.toString());
    localStorage.setItem('fecha_hasta_resultado', this._resultado.fecha_hasta_resultado.toString());
  }

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
      fecha_autodiagnostico: new Date(localStorage.getItem('fecha_autodiagnostico')),
      fecha_hasta_resultado: new Date(localStorage.getItem('fecha_hasta_resultado'))
    }
    
    return of(true);
  }
}
