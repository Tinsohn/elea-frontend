import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UsuarioResultadosComponent } from './usuario-resultados.component';

@NgModule({
  declarations: [UsuarioResultadosComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [UsuarioResultadosComponent]
})
export class UsuarioResultadosModule { }
