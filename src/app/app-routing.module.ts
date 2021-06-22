import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UsuarioIngresoComponent } from './pages/usuario-ingreso/usuario-ingreso.component';
import { AutoevaluacionComponent } from './pages/autoevaluacion/autoevaluacion.component';
import { UsuarioResultadosComponent } from './pages/usuario-resultados/usuario-resultados.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ingreso', component: UsuarioIngresoComponent },
  { path: 'autoevaluacion', component: AutoevaluacionComponent },
  { path: 'resultados', component: UsuarioResultadosComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
