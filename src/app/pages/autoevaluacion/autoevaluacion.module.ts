import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AutoevaluacionComponent } from './autoevaluacion.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { ResumenComponent } from './resumen/resumen.component';
import { DialogDeclaracionJuradaComponent } from './components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';


@NgModule({
  declarations: [
    AutoevaluacionComponent,
    TemperaturaComponent,
    SintomasComponent,
    AntecedentesComponent,
    ResumenComponent,
    DialogDeclaracionJuradaComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    AutoevaluacionComponent
  ]
})
export class AutoevaluacionModule { }
