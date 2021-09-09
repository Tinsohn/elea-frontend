import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home2/home.module';
import { UsuarioIngresoModule } from './usuario-ingreso/usuario-ingreso.module';
import { AutodiagnosticoModule } from './autodiagnostico/autodiagnostico.module';
import { UsuarioResultadosModule } from './usuario-resultados/usuario-resultados.module';

const PAGINAS_MODULOS = [
  HomeModule,
  UsuarioIngresoModule,
  AutodiagnosticoModule,
  UsuarioResultadosModule
]

@NgModule({
  imports: [
    CommonModule,
    PAGINAS_MODULOS
  ],
  exports: [
    PAGINAS_MODULOS
  ]
})
export class PagesModule { }
