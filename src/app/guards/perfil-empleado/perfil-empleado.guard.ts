import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PerfilEmpleadoService } from 'src/app/services/perfil-empleado/perfil-empleado.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilEmpleadoGuard implements CanActivate {
  
  constructor(private router: Router,
    private _perfilEmpleadoService: PerfilEmpleadoService) {}

  canActivate(): Observable<boolean> | boolean {
    return this._perfilEmpleadoService.verificarPerfil()
              .pipe(
                tap( validado => {
                  if (!validado) {
                    this.router.navigate(['/ingreso']);
                  }
                })
              );
  }

  canLoad(): Observable<boolean> | boolean {
    return this._perfilEmpleadoService.verificarPerfil()
              .pipe(
                tap( validado => {
                  if (!validado) {
                    this.router.navigate(['/ingreso']);
                  }
                })
              );
  }
  
}
