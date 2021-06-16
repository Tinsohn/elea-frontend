import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UsuarioIngresoComponent } from './pages/usuario-ingreso/usuario-ingreso.component';
import { AutodiagnosticoComponent } from './pages/autodiagnostico/autodiagnostico.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuario-ingreso', component: UsuarioIngresoComponent },
  { path: 'autodiagnostico', component: AutodiagnosticoComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
