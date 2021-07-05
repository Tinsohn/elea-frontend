import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxCaptchaModule } from 'ngx-captcha';

import { UsuarioIngresoComponent } from './usuario-ingreso.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { VisitanteComponent } from './visitante/visitante.component';
import { DialogTerminosCondicionesComponent } from './components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';

@NgModule({
  declarations: [
    UsuarioIngresoComponent,
    EmpleadoComponent,
    VisitanteComponent,
    DialogTerminosCondicionesComponent
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
