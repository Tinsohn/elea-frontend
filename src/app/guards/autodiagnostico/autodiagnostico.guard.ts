import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoGuard implements CanActivate, CanLoad {
  
  constructor(private router: Router,
              private autoevaluacionService: AutodiagnosticoService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autoevaluacionService.validarResultadosGrabados()
              .pipe(
                tap( isGrabado => {
                  if (!isGrabado) {
                    this.router.navigate(['/autoevaluacion']);
                  }
                })
              );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
