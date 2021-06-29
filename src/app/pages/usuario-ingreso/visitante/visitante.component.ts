import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from '../../../services/usuario/usuario.service';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';

import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit {
  private _siteKey: string = environment.siteKeyCaptcha;

  form: FormGroup;

  get siteKey(): string {
    return this._siteKey;
  }
  
  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAccesoService.lugaresAcceso;
  }

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private usuarioService: UsuarioService,
              private _lugaresAccesoService: LugarAccesoService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      dni: ['', [Validators.required,
                 Validators.minLength(8), 
                 Validators.maxLength(8), 
                 Validators.pattern('[0-9]*')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, 
                      Validators.pattern('[0-9]*')]],
      empresa: ['', Validators.required],
      email: ['', [Validators.required, 
                   Validators.email, 
                   Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')]],
      idLugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required],
      terminosCondicion: [null, Validators.required]
    });
  }

  getErrorMessage(campo: string) {
    
    if (this.form.get(campo).hasError('required')) {
      return 'Campo requerido';
    }

    if (campo === 'dni') {
      if (this.form.get(campo).hasError('minLength')
          || this.form.get(campo).hasError('maxLength')
          || this.form.get(campo).hasError('pattern')) {
        return 'Debe ingresar un D.N.I. válido sin puntos';
      }
    }

    if (campo === 'telefono') {
      if (this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un teléfono válido';
      }
    }

    if (campo === 'email') {
      if (this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un e-mail válido';
      }
    }

    return;
  }

  submit() {
    this.usuarioService.crearUsuarioVisitante(this.form);

    this.router.navigate(['/autoevaluacion']);
  }

  openDialogTerminosCondiciones() {
    this.dialog.open(DialogTerminosCondicionesComponent);
  }
}
