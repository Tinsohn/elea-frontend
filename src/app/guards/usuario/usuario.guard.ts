import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private usuarioService: UsuarioService) {}

  // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.verificarAutenticacion()
              .pipe(
                tap( validado => {
                  if (!validado) {
                    this.router.navigate(['/ingreso']);
                  }
                })
              );
  }
  
  // route: Route, segments: UrlSegment[]
  canLoad(): Observable<boolean> | boolean {
    return this.usuarioService.verificarAutenticacion()
              .pipe(
                tap( validado => {
                  if (!validado) {
                    this.router.navigate(['/ingreso']);
                  }
                })
              );
  }
}
