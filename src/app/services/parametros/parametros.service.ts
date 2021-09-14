import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { PropertiesService } from '../properties/properties.service';
import { Parametro } from 'src/app/interfaces/parametro.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  // private autodiagnostico_backend: string = environment.autodiagnostico_backend;

  constructor(private http: HttpClient,
              private _propertiesService: PropertiesService) { }

  getParametros() {
    // return this.http.get<Parametro[]>(`${this.autodiagnostico_backend}/parametros`);
    return this._propertiesService.obtenerProperties()
      .pipe(
        switchMap(properties => this.http.get<Parametro[]>(`${properties.autodiagnostico_backend}/parametros`))
      );
  }
}
