import { Component, OnInit } from '@angular/core';
import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { ResultadoService } from '../../services/resultado/resultado.service';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: ['./autodiagnostico.component.css']
})
export class AutodiagnosticoComponent implements OnInit {
  loading: boolean = false;

  constructor(private autodiagnosticoService: AutodiagnosticoService,
              private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.autodiagnosticoService.obtenerRangoTemperatura();
    this.autodiagnosticoService.reset();
    this.resultadoService.limpiarResultadosLocalStorage();
  }

  isLoading(event) {
    this.loading = event;
  }
}