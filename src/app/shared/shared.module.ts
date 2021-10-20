import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DialogMensajeErrorComponent } from './dialog-mensaje-error/dialog-mensaje-error.component';
import { FormsAntecedentesVacunasComponent } from './forms-antecedentes-vacunas/forms-antecedentes-vacunas.component';



@NgModule({
  declarations: [DialogMensajeErrorComponent, FormsAntecedentesVacunasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [DialogMensajeErrorComponent, FormsAntecedentesVacunasComponent]
})
export class SharedModule { }
