import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Properties } from 'src/app/interfaces/properties.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private _propertiesFilePath: string = environment.propertiesFilePath;

  constructor(private http: HttpClient) { }

  obtenerProperties(): Observable<Properties> {
    return this.http.get<Properties>(this._propertiesFilePath);
  }
}
