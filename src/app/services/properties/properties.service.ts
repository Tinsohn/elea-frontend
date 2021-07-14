import { Injectable } from '@angular/core';

import { Properties } from '../../interfaces/properties.interface';

import properties from '/autodiagnostico/autodiagnostico-front.json';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private _properties: Properties;

  get properties() {
    return this._properties;
  }

  constructor() { 
    this._properties = properties;
  }
}
