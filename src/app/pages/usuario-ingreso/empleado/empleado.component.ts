import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ReCaptcha2Component } from 'ngx-captcha'

import { environment } from 'src/environments/environment';

import { UsuarioService } from '../../../services/usuario/usuario.service';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';

// import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();

  // Campos captcha
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  readonly siteKey: string = environment.siteKeyCaptcha;
  readonly type: string = 'image';
  readonly lang: string = 'es-419';

  form: FormGroup;

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAccesoService.lugaresAcceso;
  }
  // lugaresAcceso: LugarAcceso[] = []

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private _usuarioService: UsuarioService,
              private _lugaresAccesoService: LugarAccesoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nroLegajo: ['', [Validators.required,
                      //  Validators.minLength(4),
                      //  Validators.maxLength(6), 
                      //  Validators.pattern('^[0-9]{5,6}$')]],
                       Validators.min(1),
                       Validators.max(99999999)]],
      dni: ['', [Validators.required, 
                 Validators.minLength(8), // ???
                 Validators.maxLength(8), 
                 Validators.pattern('^(m|M|f|F)?[1-9]{1}[0-9]{6,7}$')]],
      emailUsuario: ['', [Validators.required, 
                          Validators.pattern('^[_a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.][a-z0-9]+)*([\.][a-z]{2,4})$')]],
      idLugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required]
      // terminosCondicion: [false, Validators.required]
    });
  }

  getErrorMessage(campo: string) {
    
    if (this.form.get(campo)?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo === 'nroLegajo') {
      // if (this.form.get(campo)?.hasError('maxLength') 
      //     || this.form.get(campo)?.hasError('pattern')) {
      //   return 'Debe ingresar un número de legajo válido';
      // }
      if (this.form.get(campo)?.hasError('min') 
          || this.form.get(campo)?.hasError('max')) {
        return 'Debe ingresar un número de legajo válido';
      }
    }

    if (campo === 'dni') {
      if (this.form.get(campo)?.hasError('maxLength') || this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un D.N.I. válido';
      }
    }

    return;
  }
  

  submit() {
    this.isLoading.emit(true);

    const { nroLegajo, dni, emailUsuario, idLugarAcceso } = this.form.value;

    this._usuarioService.autenticarUsuarioEmpleado(String(nroLegajo), emailUsuario, idLugarAcceso)
      .subscribe( empleado => {
        // console.log('empleado component', empleado)
        
        if ( empleado.nroLegajo && (empleado.dni === dni) ) {
          this.router.navigate(['/autoevaluacion']);
          this.isLoading.emit(false);
        } else {
          localStorage.clear();
          this.isLoading.emit(false);

          this.reset();
          this.dialog.open(DialogMensajeErrorComponent, {
            data: { msg: 'El DNI ingresado es incorrecto' }
          });
        }
      },
      () => {
        this.isLoading.emit(false);

        this.reset();
        this.dialog.open(DialogMensajeErrorComponent, {
          data: { msg: `El número de legajo ingresado no existe` }
        });
      });
    
    
      // this.router.navigate(['/autoevaluacion']);
  }

  // openDialogTerminosCondiciones() {
  //   this.dialog.open(DialogTerminosCondicionesComponent);
  // }

  private reset() {
    this.form.reset({
      nroLegajo: '',
      dni: '',
      idLugarAcceso: '',
      recaptcha: false
      // terminosCondicion: false
    });
    this.captchaElem.resetCaptcha();
    this.form.markAsUntouched();
  }
}
