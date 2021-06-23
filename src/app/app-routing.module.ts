import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UsuarioIngresoComponent } from './pages/usuario-ingreso/usuario-ingreso.component';
import { AutoevaluacionComponent } from './pages/autoevaluacion/autoevaluacion.component';
import { UsuarioResultadosComponent } from './pages/usuario-resultados/usuario-resultados.component';

import { UsuarioGuard } from './pages/guards/usuario/usuario.guard';
import { AutoevaluacionGuard } from './pages/guards/autoevaluacion/autoevaluacion.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ingreso', component: UsuarioIngresoComponent },
  { path: 'autoevaluacion', component: AutoevaluacionComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard] },
  { path: 'resultados', component: UsuarioResultadosComponent, canLoad: [UsuarioGuard, AutoevaluacionGuard], canActivate: [UsuarioGuard, AutoevaluacionGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
