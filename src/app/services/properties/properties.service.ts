import { Injectable } from '@angular/core';
import { Properties } from '../../interfaces/properties.interface';
import { HttpClient } from '@angular/common/http';

import properties from '/autodiagnostico/autodiagnostico-front.json';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private _properties: Properties;

  get properties() {
    return this._properties;
  }

  constructor(private http: HttpClient) { 
    this._properties = properties;
  }
}
