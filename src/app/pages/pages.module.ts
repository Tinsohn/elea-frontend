import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home2/home.module';
import { UsuarioIngresoModule } from './usuario-ingreso/usuario-ingreso.module';
import { AutodiagnosticoModule } from './autodiagnostico/autodiagnostico.module';
import { UsuarioResultadosModule } from './usuario-resultados/usuario-resultados.module';
import { PerfilEmpleadoModule } from './perfil-empleado/perfil-empleado.module';

const PAGINAS_MODULOS = [
  HomeModule,
  UsuarioIngresoModule,
  AutodiagnosticoModule,
  UsuarioResultadosModule,
  PerfilEmpleadoModule
]

@NgModule({
  imports: [
    CommonModule,
    PAGINAS_MODULOS
  ],
  exports: [
    PAGINAS_MODULOS
  ],
  declarations: []
})
export class PagesModule { }
