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

  constructor(private autoevaluacionService: AutodiagnosticoService,
              private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.autoevaluacionService.reset();
    this.resultadoService.limpiarResultadosLocalStorage();
  }

  isLoading(event) {
    this.loading = event;
  }
}