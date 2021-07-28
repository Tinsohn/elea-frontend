import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// import { Properties } from '../../interfaces/properties.interface';
import { of } from 'rxjs';

// let propertiesJson = require('file:///C:/autodiagnostico/autodiagnostico-front.json');
// let propertiesJson = require('/autodiagnostico/autodiagnostico-front.json');
// import propertiesJson from '/autodiagnostico/autodiagnostico-front.json';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private _properties: any;

  get properties() {
    return this._properties;
  }

  constructor(private http: HttpClient) { 
    
    // this._properties = propertiesJson;
    
  }

  cargarProperties() {
    return this.http.get<any>('C:/autodiagnostico/autodiagnostico-front.json')
      .pipe(
        map(
          propertiesJson => {
            this._properties = propertiesJson;

            return true;
          }
        )
      );


    ////////////////////////////////////
    // let resp = null;

    // const file = 'file:///C:/autodiagnostico/autodiagnostico-front.json';

    // const request = new XMLHttpRequest();
    // request.open('GET', file, false);
    // // request.responseType = 'json';

    // request.onreadystatechange = function ()
    // {
    //   console.log('State: ' + request.readyState);
    //     if(request.readyState === 4)
    //     {
    //         if(request.status === 200 || request.status == 0)
    //         {
    //             var allText = request.responseText;
    //             alert(allText);
    //         }
    //     }
    // }

    // console.log('REQUEST ANTES DEL SEND ', request)
    
    // request.send(null);
    // console.log('REQUEST LUEGO DEL SEND ', request)
    
    // request.onload = function() {
    //   resp = request.response;
    //   console.log("RESP: ", resp)
    // }
    
    // this._properties = resp as Properties;
    
    // console.log("PROPERTIES: ", this._properties);

    // return this.properties;
  }

}
