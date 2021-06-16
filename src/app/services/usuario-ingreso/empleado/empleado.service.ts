import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { Empleado } from 'src/app/models/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getEmpleadoPorId(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/usuario/empleado/${id}`);
  }
}
