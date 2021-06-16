import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AutodiagnosticoComponent } from './autodiagnostico.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { ResumenComponent } from './resumen/resumen.component';


@NgModule({
  declarations: [
    AutodiagnosticoComponent,
    TemperaturaComponent,
    SintomasComponent,
    AntecedentesComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    AutodiagnosticoComponent
  ]
})
export class AutodiagnosticoModule { }
