import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxCaptchaModule } from 'ngx-captcha';

import { UsuarioIngresoComponent } from './usuario-ingreso.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { VisitanteComponent } from './visitante/visitante.component';

@NgModule({
  declarations: [
    UsuarioIngresoComponent,
    EmpleadoComponent,
    VisitanteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    NgxCaptchaModule
  ],
  exports: [
    UsuarioIngresoComponent
  ]
})
export class UsuarioIngresoModule { }
