import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Parametro } from 'src/app/interfaces/parametro.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private autodiagnostico_backend: string = environment.autodiagnostico_backend;

  constructor(private http: HttpClient) { }

  getParametros() {
    return this.http.get<Parametro[]>(`${this.autodiagnostico_backend}/parametros`);
  }
}
