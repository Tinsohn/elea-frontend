import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-contacto-estrecho',
  templateUrl: './contacto-estrecho.component.html',
  styleUrls: ['./contacto-estrecho.component.css']
})
export class ContactoEstrechoComponent implements OnInit {

  get txtCamposContactoEstrecho(): string[] {
    return this.autodiagnosticoService.txtCamposContactoEstrecho;
  }

  get formAutoevaluacion(): FormGroup {
    return this.autodiagnosticoService.formAutoevaluacion;
  }

  get contactoEstrecho(): FormArray {
    return this.formAutoevaluacion.get('contactoEstrecho') as FormArray;
  }

  constructor(private autodiagnosticoService: AutodiagnosticoService) { }

  ngOnInit(): void {
  }

}
