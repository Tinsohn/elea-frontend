import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { UsuarioIngresoModule } from './usuario-ingreso/usuario-ingreso.module';
import { AutoevaluacionModule } from './autoevaluacion/autoevaluacion.module';

const PAGINAS_MODULOS = [
  HomeModule,
  UsuarioIngresoModule,
  AutoevaluacionModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PAGINAS_MODULOS
  ],
  exports: [
    PAGINAS_MODULOS
  ]
})
export class PagesModule { }
