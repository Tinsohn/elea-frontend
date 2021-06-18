import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_MODULES
  ],
  exports: [MATERIAL_MODULES]
})
export class AngularMaterialModule { }
