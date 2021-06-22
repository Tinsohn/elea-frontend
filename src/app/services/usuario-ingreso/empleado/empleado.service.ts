import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/interfaces/empleado.interface';

// import { Empleado } from 'src/app/models/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseUrl: string = 'http://localhost:8080'

  private _empleado: Empleado | undefined;

  constructor(private http: HttpClient) { }

  getEmpleadoPorNroLegajo(nroLegajo: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/legajo/empleado/${nroLegajo}`);
  }
}
