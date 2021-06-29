import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { ResultadoService } from '../../services/resultado/resultado.service';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoGuard implements CanActivate, CanLoad {
  
  constructor(private router: Router,
              private resultadoService: ResultadoService,
              private autoevaluacionService: AutodiagnosticoService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // return this.autoevaluacionService.validarResultadosGrabados()
    //           .pipe(
    //             tap( isGrabado => {
    //               if (!isGrabado) {
    //                 this.router.navigate(['/autoevaluacion']);
    //               }
    //             })
    //           );
    return this.resultadoService.validarResultadosGrabados()
              .pipe(
                tap( isGrabado => {
                  if (!isGrabado) {
                    this.router.navigate(['/autoevaluacion']);
                  }
                })
              );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.resultadoService.validarResultadosGrabados();
  }
}
