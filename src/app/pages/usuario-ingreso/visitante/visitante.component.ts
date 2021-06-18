import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso.service';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit {
  form: FormGroup;
  siteKey: string = "6Ld58yUbAAAAACRtuaTZ9cZ9BkynxvoutKphl7s1";
  lugaresAcceso: LugarAcceso[] = [];

  constructor(private fb: FormBuilder,
              private _lugaresAccesoService: LugarAccesoService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      empresa: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
    
    this.lugaresAcceso = this._lugaresAccesoService.getLugaresAcceso();
  }

  getErrorMessage(campo: string) {
    
    if (this.form.get(campo)?.hasError('required')) {
      return 'Campo requerido';
    }

    if (campo === 'dni') {
      if (this.form.get(campo)?.hasError('maxLength') || this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un D.N.I. válido';
      }
    }

    if (campo === 'telefono') {
      if (this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un teléfono válido';
      }
    }

    if (campo === 'email') {
      if (this.form.get(campo)?.hasError('email')) {
        return 'Debe ingresar un email válido';
      }
    }

    return;
  }

  submit() {
    this.router.navigate(['/autodiagnostico']);
  }
}
