import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { ResultadoService } from '../../services/resultado/resultado.service';
import { Vacuna } from '../../interfaces/vacuna.interface';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: ['./autodiagnostico.component.css']
})
export class AutodiagnosticoComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  // vacunas: Vacuna[] = [];

  private _rangoTemperaturaSubscription: Subscription;
  private _preguntasSubscription: Subscription;
  private _vacunasSubscription: Subscription;

  constructor(private _autodiagnosticoService: AutodiagnosticoService,
              private _resultadoService: ResultadoService) { }

  ngOnInit(): void {
    // inicializa los valores tempMin y tempMax en el service
    this._rangoTemperaturaSubscription = this._autodiagnosticoService.obtenerRangoTemperatura();

    // inicializa arrays de txtPreguntaX
    this._preguntasSubscription = this._autodiagnosticoService.obtenerPreguntas()
      .subscribe();

    // inicializa array de vacunas
    this._vacunasSubscription   = this._autodiagnosticoService.obtenerVacunas()
      .subscribe();

    this._autodiagnosticoService.reset();
    this._resultadoService.limpiarResultadosLocalStorage();
  }

  ngOnDestroy(): void {
    if (this._rangoTemperaturaSubscription) {
      this._rangoTemperaturaSubscription.unsubscribe();
    }
    
    if (this._preguntasSubscription) {
      this._preguntasSubscription.unsubscribe();
    }

    if(this._vacunasSubscription) {
      this._vacunasSubscription.unsubscribe();
    }
  }

  isLoading(event) {
    this.loading = event;
  }
}