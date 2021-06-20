import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeclaracionJuradaComponent } from '../components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';
import { AutoevaluacionService } from '../../../services/autoevaluacion/autoevaluacion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {

  @Input() stepper: any;

  get temperaturaGrados(): number {
    return this.autoevaluacionService.temperaturaGrados;
  }

  get sintomas(): FormGroup {
    return this.autoevaluacionService.sintomas;
  }

  get antecedentes(): FormGroup {
    return this.autoevaluacionService.antecedentes;
  }

  constructor(public dialog: MatDialog,
              private autoevaluacionService: AutoevaluacionService) { }

  reset(stepper: any) {
    stepper.reset();
    this.autoevaluacionService.reset();
  }

  openDialog() {
    this.dialog.open(DialogDeclaracionJuradaComponent, {
      width: '90%',
      maxWidth: '450px',
      // minWidth: '280px'
    });
  }

}
