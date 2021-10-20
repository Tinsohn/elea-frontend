import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Pregunta } from 'src/app/interfaces/pregunta.interface';
import { Vacuna } from 'src/app/interfaces/vacuna.interface';

import { AutodiagnosticoService } from 'src/app/services/autodiagnostico/autodiagnostico.service';
import { PerfilEmpleadoService } from 'src/app/services/perfil-empleado/perfil-empleado.service';

@Component({
  selector: 'app-forms-antecedentes-vacunas',
  templateUrl: './forms-antecedentes-vacunas.component.html',
  styleUrls: ['./forms-antecedentes-vacunas.component.css']
})
export class FormsAntecedentesVacunasComponent {
  get preguntasAntecedentes(): Pregunta[] {
    return this._autodiagnosticoService.preguntasAntecedentes;
  }

  get txtPreguntasVacunacion(): string[] {
    return this._autodiagnosticoService.txtPreguntasVacunacion;
  }
  get preguntasVacunacion(): Pregunta[] {
    return this._autodiagnosticoService.preguntasVacunacion;
  }

  get formAutodiagnostico(): FormGroup {
    return this._autodiagnosticoService.formAutodiagnostico;
  }

  get formVacunas(): FormGroup {
    return this._autodiagnosticoService.formVacunas;
  }

  get antecedentes(): FormArray {
    return this.formAutodiagnostico.get('antecedentes') as FormArray;
  }

  get vacunas(): Vacuna[] {
    return this._autodiagnosticoService.vacunas;
  }

  constructor(private _autodiagnosticoService: AutodiagnosticoService,
              private _perfilEmpleado: PerfilEmpleadoService) { }

}
