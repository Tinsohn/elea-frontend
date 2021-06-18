import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeclaracionJuradaComponent } from '../components/dialog-declaracion-jurada/dialog-declaracion-jurada.component';
import { AutoevaluacionStepperService } from '../../../services/autoevaluacion/autoevaluacion-stepper.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {

  @Input() stepper: any;

  constructor(public dialog: MatDialog,
              public autodiagnosticoService: AutoevaluacionStepperService) { }

  reset(stepper: any) {
    stepper.reset();
    this.autodiagnosticoService.reset();
  }

  openDialog() {
    this.dialog.open(DialogDeclaracionJuradaComponent);
  }

}
