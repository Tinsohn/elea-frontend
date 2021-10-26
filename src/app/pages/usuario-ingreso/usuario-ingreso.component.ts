import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LugarAcceso } from 'src/app/interfaces/lugar-acceso.interface';
import { DialogMensajeErrorComponent } from 'src/app/shared/dialog-mensaje-error/dialog-mensaje-error.component';
import { LugarAccesoService } from '../../services/lugar-acceso/lugar-acceso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit {
  checked: boolean = true;

  loading: boolean = false;

  lugaresAcceso: LugarAcceso[] = [];

  private _lugaresAccesoSubscription: Subscription;

  constructor(private _lugaresAccesoService: LugarAccesoService,
              private dialog: MatDialog ) {
    this.getLugaresAcceso();
  }
  
  ngOnInit(): void {
    localStorage.clear();
  }

  ngOnDestroy(): void {
    if(this._lugaresAccesoSubscription) {
      this._lugaresAccesoSubscription.unsubscribe();
    }
  }

  isLoading(event) {
    this.loading = event;
  }

  getLugaresAcceso() {
    this.loading = true;
    this._lugaresAccesoSubscription = this._lugaresAccesoService.getLugaresAcceso()
      .subscribe(lugaresAcceso => {
        for(let i=0; i<lugaresAcceso.length; i++) {
          if (lugaresAcceso[i].estado === 1) {
            this.lugaresAcceso.push(lugaresAcceso[i]);
          }
        }
        this.loading = false;
      }, err => {
        this.lugaresAcceso = [];
        this.loading = false;
        this.dialog.open(DialogMensajeErrorComponent, {
          data: { msg: 'No se pudieron cargar los lugares de acceso' }
        });
      });
  }
}
