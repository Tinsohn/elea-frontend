import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { EmpleadoService } from 'src/app/services/usuario-ingreso/empleado/empleado.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private usuarioService: UsuarioService,
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
      // return this.usuarioService.verificarAutenticacion()
      //           .pipe(
      //             tap( isAutenticado => {
      //               if (!isAutenticado) {
      //                 this.router.navigate(['/ingreso']);
      //               }
      //             })
      //           );
    }
  
  // route: Route, segments: UrlSegment[]
  canLoad(): Observable<boolean> | boolean {
      return this.empleadoService.verificarAutenticacion();
      // return this.usuarioService.verificarAutenticacion();
  }
}
