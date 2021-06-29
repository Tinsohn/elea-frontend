import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';

// import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario/usuario.service';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';

import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';
import { DialogMensajeErrorIngresoComponent } from '../components/dialog-mensaje-error-ingreso/dialog-mensaje-error-ingreso.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  // loading: boolean = false;

  private _siteKey: string = environment.siteKeyCaptcha;

  form: FormGroup;

  // usuario!: Usuario;

  get siteKey(): string {
    return this._siteKey;
  }

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAccesoService.lugaresAcceso;
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private _usuarioService: UsuarioService,
              private _lugaresAccesoService: LugarAccesoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nroLegajo: ['', [Validators.required,
                       Validators.minLength(8),
                       Validators.maxLength(8), 
                       Validators.pattern('[0-9]*')]],
      dni: ['', [Validators.required, 
                 Validators.minLength(1), // ???
                 Validators.maxLength(10), 
                 Validators.pattern('[0-9]*')]],
      idLugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required],
      terminosCondicion: [null, Validators.required]
    });
  }

  getErrorMessage(campo: string) {
    
    if (this.form.get(campo)?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo === 'nroLegajo') {
      if (this.form.get(campo)?.hasError('maxLength') || this.form.get(campo)?.hasError('pattern')) {
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
    // this.loading = true;

    const { nroLegajo, dni, idLugarAcceso } = this.form.value;
    console.log(nroLegajo, dni, idLugarAcceso);

    this._usuarioService.autenticarUsuarioEmpleado(nroLegajo, idLugarAcceso)
      .subscribe( empleado => {
        
        if ( empleado.nroLegajo && (empleado.dni === dni) ) {
          this.router.navigate(['/autoevaluacion']);
          console.log("empleado component", this._usuarioService.usuario)
        } else {
          localStorage.clear();
          // alert('DNI incorrecto');
          this.dialog.open(DialogMensajeErrorIngresoComponent, {
            data: { msg: 'El DNI ingresado es incorrecto' }
          });
        }
      },
      err => {
        console.log(err);
        this.dialog.open(DialogMensajeErrorIngresoComponent, {
          data: { msg: `El número de legajo ingresado no existe` }
        });
      });
    
    
      // this.router.navigate(['/autoevaluacion']);
  }

  openDialogTerminosCondiciones() {
    this.dialog.open(DialogTerminosCondicionesComponent);
  }
}
