import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';

import { PerfilEmpleadoComponent } from './perfil-empleado.component';



@NgModule({
  declarations: [PerfilEmpleadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [PerfilEmpleadoComponent]
})
export class PerfilEmpleadoModule { }
