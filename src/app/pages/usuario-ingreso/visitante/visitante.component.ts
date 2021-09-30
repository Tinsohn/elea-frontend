import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ReCaptcha2Component } from 'ngx-captcha';

import { environment } from 'src/environments/environment';

import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ResultadoService } from '../../../services/resultado/resultado.service';
import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';

// import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';
import { PropertiesService } from '../../../services/properties/properties.service';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit, OnDestroy {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();
  @Input() lugaresAcceso: LugarAcceso[] = [];

  // Campos Captcha
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  // readonly siteKey: string = environment.siteKeyCaptcha;
  public siteKey: string = null;
  readonly type: string = 'image';
  readonly lang: string = 'es-419';

  form: FormGroup;

  private _resultadoAutodiagSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private _propertiesService: PropertiesService,
              private _usuarioService: UsuarioService,
              private _resultadoService: ResultadoService) {
                this.isLoading.emit(true);
                this._propertiesService.obtenerProperties()
                  .subscribe(properties => {
                    this.siteKey = properties.siteKeyCaptcha
                    this.isLoading.emit(false);
                  });
              }

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

  ngOnDestroy(): void {
    if (this._resultadoAutodiagSubscription) {
      this._resultadoAutodiagSubscription.unsubscribe();
    }
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
    const { dni } = this.form.value;

    this.isLoading.emit(true);
    this._usuarioService.crearUsuarioVisitante(this.form);

    this._resultadoAutodiagSubscription = this._resultadoService.obtenerAutodiagnostico('0', dni)
      .subscribe(resp => {
        if ( resp.ok ) {
          if ( !resp.isAutodiagnostico || !resp.isBloqueado) {
            // console.log('Usted NO realizo un autodiagnostico o NO esta bloqueado');
            this.router.navigate(['/autoevaluacion']);
          } else if ( resp.isBloqueado ) {
            
            // console.warn('Usted esta bloqueado');
            this.dialog.open(DialogMensajeErrorComponent, {
              data: {
                title: 'Usuario bloqueado',
                msg: 'Ud. no está apto para concurrir a la planta seleccionada. Por favor contacte con el consultorio médico de Elea.'
              }
            });
          }
        } else {
          this.dialog.open(DialogMensajeErrorComponent, {
            data: { msg: resp.message }
          });
        }
        this.isLoading.emit(false);
      });
    
    // this.isLoading.emit(false);
    // this.router.navigate(['/autoevaluacion']);
  }

  // openDialogTerminosCondiciones() {
  //   this.dialog.open(DialogTerminosCondicionesComponent);
  // }
}
