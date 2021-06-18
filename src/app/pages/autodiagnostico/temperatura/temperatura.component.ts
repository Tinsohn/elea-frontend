import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutodiagnosticoService } from '../../../services/autodiagnostico/autodiagnostico.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  // temperaturaGrados: number = 37;
  // temperatura!: FormGroup;

  constructor(private router: Router,
              public autodiagnosticoService: AutodiagnosticoService) {
  }

  ngOnInit(): void {
    // this.temperatura = this.fb.group({
    //   // tempGrados: `${ this.temperaturaGrados }`
    //   tempGrados: this.temperaturaGrados
    // });
    // this.temperaturaGrados = this.autodiagnosticoService.temperaturaGrados;
  }
  
  cambiarTemp(valor: number) {
    this.autodiagnosticoService.cambiarTemp(valor);
    // console.log(this.autodiagnosticoService.temperaturaGrados);
  }

  volverIngreso() {
    this.router.navigate(['/usuario-ingreso']);
  }
}
