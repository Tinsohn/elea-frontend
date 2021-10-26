import { Component, EventEmitter, OnInit, OnDestroy, Output, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ReCaptcha2Component } from 'ngx-captcha'

import { environment } from 'src/environments/environment';

import { UsuarioService } from '../../../services/usuario/usuario.service';

import { ResultadoService } from '../../../services/resultado/resultado.service';

import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { LugarAccesoService } from 'src/app/services/lugar-acceso/lugar-acceso.service';

// import { DialogTerminosCondicionesComponent } from '../components/dialog-terminos-condiciones/dialog-terminos-condiciones.component';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';
import { PropertiesService } from '../../../services/properties/properties.service';
import { PerfilEmpleadoService } from '../../../services/perfil-empleado/perfil-empleado.service';



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit, OnDestroy {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();
  @Input() lugaresAcceso: LugarAcceso[] = [];

  // Campos captcha
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  // readonly siteKey: string = environment.siteKeyCaptcha;
  public siteKey: string = null;
  readonly type: string = 'image';
  readonly lang: string = 'es-419';

  private perfilIncompleto: boolean = false;

  form: FormGroup;

  private _autenticarUsuarioSubscription: Subscription;
  private _prefilEmpleadoSubscription: Subscription;
  private _resultadoAutodiagSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private _propertiesService: PropertiesService,
              private _usuarioService: UsuarioService,
              private _resultadoService: ResultadoService,
              private _perfilEmpleadoService: PerfilEmpleadoService) {
                this.isLoading.emit(true);
                this._propertiesService.obtenerProperties()
                  .subscribe(properties => {
                    this.siteKey = properties.siteKeyCaptcha
                    this.isLoading.emit(false);
                  });
              }

  ngOnInit(): void {
    this.form = this.fb.group({
      // nroLegajo: ['', [
      //                   Validators.min(1),
      //                   Validators.max(99999999)
      //                   // Validators.minLength(4),
      //                   // Validators.maxLength(6), 
      //                   // Validators.pattern('^[0-9]{5,6}$')
      //                 ]],
      dni: ['', [
                  Validators.required, 
                  Validators.minLength(8), // ???
                  Validators.maxLength(8), 
                  Validators.pattern('^(m|M|f|F)?[1-9]{1}[0-9]{6,7}$')
                ]],
      // emailUsuario: ['', [
      //                     Validators.required, 
      //                     Validators.pattern('^[_a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.][a-z0-9]+)*([\.][a-z]{2,4})$')
      //                   ]],
      idLugarAcceso: ['1', Validators.required],
      recaptcha: ['', Validators.required]
      // terminosCondicion: [false, Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this._autenticarUsuarioSubscription){
      this._autenticarUsuarioSubscription.unsubscribe();
    }
    if (this._prefilEmpleadoSubscription) {
      this._prefilEmpleadoSubscription.unsubscribe();
    }
    if (this._resultadoAutodiagSubscription) {
      this._resultadoAutodiagSubscription.unsubscribe();
    }
  }

  getErrorMessage(campo: string) {
    
    if (this.form.get(campo)?.hasError('required')) {
      return 'Campo requerido';
    }
    // if (campo === 'nroLegajo') {
    //   // if (this.form.get(campo)?.hasError('maxLength') 
    //   //     || this.form.get(campo)?.hasError('pattern')) {
    //   //   return 'Debe ingresar un número de legajo válido';
    //   // }
    //   if (this.form.get(campo)?.hasError('min') 
    //       || this.form.get(campo)?.hasError('max')) {
    //     return 'Debe ingresar un número de legajo válido';
    //   }
    // }

    if (campo === 'dni') {
      if (this.form.get(campo)?.hasError('maxLength') || this.form.get(campo)?.hasError('pattern')) {
        return 'Debe ingresar un D.N.I. válido';
      }
    }

    return;
  }
  

  submit(button: string) {
    this.isLoading.emit(true);

    // const { nroLegajo, dni, emailUsuario, idLugarAcceso } = this.form.value;
    // const { dni, emailUsuario, idLugarAcceso } = this.form.value;
    const { dni, idLugarAcceso } = this.form.value;

    // this._autenticarUsuarioSubscription = this._usuarioService.autenticarUsuarioEmpleadoPorDni(dni, String(nroLegajo), emailUsuario, idLugarAcceso)
    this._autenticarUsuarioSubscription = this._usuarioService.autenticarUsuarioEmpleadoPorDni(dni, idLugarAcceso)
      .subscribe( resp => {
        // console.log('RESPUESTA', resp);
        
        if ( !resp.ok ) {
          // this.reset();
          // this.dialog.open(DialogMensajeErrorComponent, {
          //   data: { msg: resp.message }
          // });
          // this.isLoading.emit(false);
          this.openDialogRespNegativa(resp);
        } else {
          // this.router.navigate(['/autoevaluacion']);
          // this._resultadoAutodiagSubscription = this._resultadoService.obtenerAutodiagnostico(String(nroLegajo), dni)


          // Cargar perfil
          this._prefilEmpleadoSubscription = this._perfilEmpleadoService.cargarPerfil(this._usuarioService.usuario.nroLegajo)
            .subscribe( resp => {
              // console.log(resp)

              if(!resp.ok ) {
                this.openDialogRespNegativa(resp);
              } else {
                this._perfilEmpleadoService.guardarPefilLocalStorage();
                this.perfilIncompleto = resp.perfilIncompleto;

                if (!resp.existePerfil) {
                  this.isLoading.emit(false);
                  if (button === 'autodiagnostico') {
                    const dialogRef = this.dialog.open(DialogMensajeErrorComponent, {
                      data: {
                        title: 'No se encontró ningún perfil',
                        msg: resp.message
                      }
                    });
                    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/perfil/crear']));
                    return;
                  } else if(button === 'cargarPerfil') {
                    this.router.navigate(['/perfil/crear']);
                    return;
                  }
                }

                if (this.perfilIncompleto && button === 'autodiagnostico') {
                  this.isLoading.emit(false);
                  const dialogRef = this.dialog.open(DialogMensajeErrorComponent, {
                    data: {
                      title: 'Perfil incompleto',
                      msg: resp.message
                    }
                  });

                  dialogRef.afterClosed().subscribe(() => this.router.navigate(['/perfil/actualizar']))
                  return;
                }

                if (button === 'cargarPerfil') {
                  this.router.navigate(['/perfil/actualizar']);
                } else if (button === 'autodiagnostico') {
                  // Traer el ultimo autodiagnostico
                  this._resultadoAutodiagSubscription = this._resultadoService.obtenerAutodiagnostico(this._usuarioService.usuario.nroLegajo, dni)
                    .subscribe(resp => {
                      this.isLoading.emit(false);
                      if ( resp.ok ) {
                        if ( !resp.isAutodiagnostico || !resp.isBloqueado) {
                          // console.log('Usted NO realizo un autodiagnostico o NO esta bloqueado');
                          this.router.navigate(['/autoevaluacion']);
                        } else if ( resp.isBloqueado ) {
                          // console.warn('Usted esta bloqueado');
                          // this.reset();
                          this.dialog.open(DialogMensajeErrorComponent, {
                            data: {
                              title: 'Usuario bloqueado',
                              msg: 'Estimado usuario, usted ya cuenta con un autodiagnóstico no habilitado activo. Por favor, vuelva cuando este autodiagnóstico expire o consulte en el consultorio médico de ELEA por su situación.'
                            }
                          });
                        }
                      } else {
                        this.dialog.open(DialogMensajeErrorComponent, {
                          data: { msg: resp.message }
                        });
                      }
                    });
                  
                }
              }
            });



          // this._perfilEmpleadoService.cargarRespuestas(this._usuarioService.usuario.nroLegajo)
          //   .subscribe( resp => {
          //     if ( !resp.ok ) {
          //       this.openDialogRespNegativa(resp);
          //     } else {
          //       // if (button === this.DESC_BTN_CARGA_PERFIL) {
          //       //   this.router.navigate(['/perfil']);
          //       // } else if (button === this.DESC_BTN_AUTODIAGNOSTICO) {
          //         // Busco el ultimo autodiagnostico realizado
          //         // this._resultadoAutodiagSubscription = this._resultadoService.obtenerAutodiagnostico(this._usuarioService.usuario.nroLegajo, dni)

          //         this.perfilIncompleto = resp.perfilIncompleto;

          //         // Traer el ultimo autodiagnostico
          //         this._resultadoAutodiagSubscription = this._resultadoService.obtenerAutodiagnostico(this._usuarioService.usuario.nroLegajo, dni)
          //           .subscribe(resp => {
          //             if ( resp.ok ) {
          //               this._perfilEmpleadoService.cargarEmailUsuario(localStorage.getItem('emailU'));
          //               this._usuarioService.cargarEmailUsuario(localStorage.getItem('emailU'));

          //               if (this.perfilIncompleto) {
          //                 this.isLoading.emit(false);
          //                 const dialogRef = this.dialog.open(DialogMensajeErrorComponent, {
          //                   data: {
          //                     title: 'Perfil incompleto',
          //                     msg: 'Por favor, complete su perfil.'
          //                   }
          //                 });

          //                 dialogRef.afterClosed().subscribe(() => this.router.navigate(['/perfil']))
          //                 return;
          //               }

          //               if (button === 'cargarPerfil') {
          //                 this.router.navigate(['/perfil']);
          //               } else if (button === 'autodiagnostico') {
          //               if ( !resp.isAutodiagnostico || !resp.isBloqueado) {
          //                 // console.log('Usted NO realizo un autodiagnostico o NO esta bloqueado');
          //                 this.router.navigate(['/autoevaluacion']);
          //               } else if ( resp.isBloqueado ) {
          //                 // console.warn('Usted esta bloqueado');
          //                 // this.reset();
          //                 this.dialog.open(DialogMensajeErrorComponent, {
          //                   data: {
          //                     title: 'Usuario bloqueado',
          //                     msg: 'Estimado usuario, usted ya cuenta con un autodiagnóstico no habilitado activo. Por favor, vuelva cuando este autodiagnóstico expire o consulte en el consultorio médico de ELEA por su situación.'
          //                   }
          //                 });
          //               }
          //             }
          //             } else {
          //               this.dialog.open(DialogMensajeErrorComponent, {
          //                 data: { msg: resp.message }
          //               });
          //             }
          //             this.isLoading.emit(false);
          //           });
          //       // }
          //     }
          //   });
        }
      });
      /*.subscribe( empleado => {
        // console.log('empleado component', empleado)
        
        // Si me devuelve un empleado
        if ( empleado ) {
          if ( empleado.nroLegajo && (empleado.dni === dni) ) {
            this.router.navigate(['/autoevaluacion']);
            // this.isLoading.emit(false);
          } else {
            localStorage.clear();
            // this.isLoading.emit(false);
  
            this.reset();
            this.dialog.open(DialogMensajeErrorComponent, {
              data: { msg: 'El DNI ingresado es incorrecto' }
            });
          }
        } else { // Si no me devuelve ningun empleado ()
          this.reset();
          this.dialog.open(DialogMensajeErrorComponent, {
            data: { msg: `El número de legajo ingresado no existe` }
          });
        }
      },
      error => {
        this.isLoading.emit(false);
        // console.error('ERROR', error);
        // console.error('TIPO DE DATO - ERROR', error instanceof HttpErrorResponse);
        
        if ( error instanceof HttpErrorResponse ) {
          this.reset();
          this.dialog.open(DialogMensajeErrorComponent, {
            data: { msg: 'Hubo un problema con el servidor' }
          });
        }
      },
      () => {
        this.isLoading.emit(false);

        // this.reset();
        // this.dialog.open(DialogMensajeErrorComponent, {
        //   data: { msg: `El número de legajo ingresado no existe` }
        // });
      }
      );*/
    
    
      // this.router.navigate(['/autoevaluacion']);
  }

  // openDialogTerminosCondiciones() {
  //   this.dialog.open(DialogTerminosCondicionesComponent);
  // }


  private reset() {
    this.form.reset({
      // nroLegajo: '',
      dni: '',
      idLugarAcceso: '',
      recaptcha: false
      // terminosCondicion: false
    });
    this.captchaElem.resetCaptcha();
    this.form.markAsUntouched();
  }

  private openDialogRespNegativa(resp) {
    this.reset();
    this.dialog.open(DialogMensajeErrorComponent, {
      data: { msg: resp.message }
    });
    this.isLoading.emit(false);
  }
}
