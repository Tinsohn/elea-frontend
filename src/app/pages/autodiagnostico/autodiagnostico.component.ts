import { Component, OnDestroy, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadoService } from '../../services/usuario-ingreso/empleado/empleado.service';
import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: ['./autodiagnostico.component.css']
})
export class AutodiagnosticoComponent implements OnInit, OnDestroy{

  get empleado() {
    return this.empleadoService.empleado;
  }

  constructor(private empleadoService: EmpleadoService,
              private autoevaluacionService: AutodiagnosticoService) { }

  ngOnInit(): void {
    this.autoevaluacionService.reset();
    localStorage.removeItem('autoevaluacion_grabada');
  }

  ngOnDestroy(): void{
    // localStorage.clear();
  }
}