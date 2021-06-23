import { Component, OnDestroy, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadoService } from '../../services/usuario-ingreso/empleado/empleado.service';
import { AutoevaluacionService } from '../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit, OnDestroy{

  get empleado() {
    return this.empleadoService.empleado;
  }

  constructor(private empleadoService: EmpleadoService,
              private autoevaluacionService: AutoevaluacionService) { }

  ngOnInit(): void {
    this.autoevaluacionService.reset();
    localStorage.removeItem('autoevaluacion_grabada');
  }

  ngOnDestroy(): void{
    // localStorage.clear();
  }
}