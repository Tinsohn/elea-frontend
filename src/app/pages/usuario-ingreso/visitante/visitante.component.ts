import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ReCaptcha2Component } from 'ngx-captcha';

import { environment } from 'src/environments/environment';

import { UsuarioService } from '../../../services/usuario/usuario.service';
import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';

// import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();

  // Campos Captcha
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  readonly siteKey: string = environment.siteKeyCaptcha;
  readonly type: string = 'image';
  readonly lang: string = 'es-419';

  form: FormGroup;
  
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
                 Validators.pattern('^(m|M|f|F)?[1-9]{1}[0-9]{6,7}$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, 
                      Validators.minLength(6), 
                      Validators.maxLength(20), 
                      Validators.pattern('^[\+]?[0-9]{6,20}$')]],
      empresa: ['', Validators.required],
      emailUsuario: ['', [Validators.required, 
                          Validators.pattern('^[_a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.][a-z0-9]+)*([\.][a-z]{2,4})$')]],
      idLugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required]
      // terminosCondicion: ['', Validators.required]
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

    if (campo === 'emailUsuario') {
      if (this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un e-mail válido';
      }
    }

    return;
  }

  submit() {
    this.isLoading.emit(true);
    this.usuarioService.crearUsuarioVisitante(this.form);
    
    this.isLoading.emit(false);
    this.router.navigate(['/autoevaluacion']);
  }

  // openDialogTerminosCondiciones() {
  //   this.dialog.open(DialogTerminosCondicionesComponent);
  // }
}
