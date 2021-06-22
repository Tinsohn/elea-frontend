import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/usuario-ingreso/lugar-acceso.service';
import { EmpleadoService } from 'src/app/services/usuario-ingreso/empleado/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  // loading: boolean = false;

  private _siteKey: string = "6Ld58yUbAAAAACRtuaTZ9cZ9BkynxvoutKphl7s1";

  form: FormGroup;

  empleado!: any;

  get siteKey(): string {
    return this._siteKey;
  }

  get lugaresAcceso(): LugarAcceso[] {
    return this._lugaresAccesoService.lugaresAcceso;
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private _empleadoService: EmpleadoService,
              private _lugaresAccesoService: LugarAccesoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nroLegajo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      dni: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      lugarAcceso: ['', Validators.required],
      recaptcha: ['', Validators.required]
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
    // console.log(this.form);

    const nroLegajo = this.form.get('nroLegajo')?.value;
    const dni = this.form.get('dni')?.value;

    // this.redireccionar(Number(nroLegajo), Number(dni));
    
    
    this.router.navigate(['/autoevaluacion']);
  }


  private redireccionar(nroLegajo: number, dni: number): void {

    this._empleadoService.getEmpleadoPorId(nroLegajo) // * RECUPERAR POR nroLegajo!
      .subscribe( empleado => { 
        
        // this.loading = false;

        if ( empleado.nroLegajo === dni) {
          // this.empleado = empleado;
          // console.log(this.empleado);
          this.router.navigate(['/autoevaluacion']);
        } else {
          console.log('dni incorrecto');
        }

      }, () => {
        this.empleado = null;
        console.log('empleado no encontrado');
      });
  }
}
