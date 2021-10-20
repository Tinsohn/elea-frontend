import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';

import { AutodiagnosticoComponent } from './autodiagnostico.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { ResumenComponent } from './resumen/resumen.component';
import { DialogDeclaracionJuradaComponent } from './components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';
import { ContactoEstrechoComponent } from './contacto-estrecho/contacto-estrecho.component';


@NgModule({
  declarations: [
    AutodiagnosticoComponent,
    TemperaturaComponent,
    SintomasComponent,
    AntecedentesComponent,
    ResumenComponent,
    DialogDeclaracionJuradaComponent,
    ContactoEstrechoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AutodiagnosticoComponent
  ]
})
export class AutodiagnosticoModule { }
