import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EmpleadoService } from 'src/app/services/usuario-ingreso/empleado/empleado.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private empleadoService: EmpleadoService) {}

  // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return this.empleadoService.verificarAutenticacion()
                .pipe(
                  tap( isAutenticado => {
                    if (!isAutenticado) {
                      this.router.navigate(['/ingreso']);
                    }
                  })
                );
  }
  
  // route: Route, segments: UrlSegment[]
  canLoad(): Observable<boolean> | boolean {
      return this.empleadoService.verificarAutenticacion();
  }
}
