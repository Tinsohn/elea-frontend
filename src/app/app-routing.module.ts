import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home2/home.component';
import { UsuarioIngresoComponent } from './pages/usuario-ingreso/usuario-ingreso.component';
import { AutodiagnosticoComponent } from './pages/autodiagnostico/autodiagnostico.component';
import { UsuarioResultadosComponent } from './pages/usuario-resultados/usuario-resultados.component';

import { UsuarioGuard } from './guards/usuario/usuario.guard';
import { AutodiagnosticoGuard } from './guards/autodiagnostico/autodiagnostico.guard';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'ingreso', component: UsuarioIngresoComponent },
  { path: 'autoevaluacion', component: AutodiagnosticoComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard] },
  { path: 'resultados', component: UsuarioResultadosComponent, canLoad: [UsuarioGuard, AutodiagnosticoGuard], canActivate: [UsuarioGuard, AutodiagnosticoGuard] },
  // { path: '**', pathMatch: 'full', redirectTo: '' }
  { path: '**', pathMatch: 'full', redirectTo: 'ingreso' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollOffset: [0, 0], scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
