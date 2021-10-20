import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AutodiagnosticoService } from '../../services/autodiagnostico/autodiagnostico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilEmpleadoService } from '../../services/perfil-empleado/perfil-empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  formEmailUsuario: FormGroup;

  private _perfilEmpleadoSubscription: Subscription;
  private _preguntasSubscription: Subscription;
  private _vacunasSubscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _autodiagnosticoService: AutodiagnosticoService,
    private _perfilEmpleadoService: PerfilEmpleadoService) { }

  ngOnInit(): void {
    this.formEmailUsuario = this.fb.group({
      emailUsuario: ['', [
                      Validators.required, 
                      Validators.pattern('^[_a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.][a-z0-9]+)*([\.][a-z]{2,4})$')
                    ]]
    });

    // TODO: la carga de perfil es para pruebas! (va en empleado.component)
    // obtiene perfil del empleado
    // this._perfilEmpleadoSubscription = this._perfilEmpleadoService.obtenerPerfil('369852')
    //   .subscribe();

    // inicializa arrays de preguntaX
    this._preguntasSubscription = this._autodiagnosticoService.obtenerPreguntas()
      .subscribe();

    // inicializa array de vacunas
    this._vacunasSubscription = this._autodiagnosticoService.obtenerVacunas()
      .subscribe();
  }

  ngOnDestroy(): void {
    if(this._perfilEmpleadoSubscription) {
      this._perfilEmpleadoSubscription.unsubscribe();
    }
    if(this._preguntasSubscription) {
      this._preguntasSubscription.unsubscribe();
    }
    if(this._vacunasSubscription) {
      this._vacunasSubscription.unsubscribe();
    }
  }

  submit() {
    this.router.navigate(['/ingreso']);
  }
}
