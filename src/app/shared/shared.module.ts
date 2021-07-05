import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { DialogMensajeErrorComponent } from './dialog-mensaje-error/dialog-mensaje-error.component';



@NgModule({
  declarations: [DialogMensajeErrorComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [DialogMensajeErrorComponent]
})
export class SharedModule { }
