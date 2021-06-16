import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  temperaturaGrados: number = 37;

  temperatura!: FormGroup;
  @Output() submitTemperatura: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.temperatura = this.fb.group({
      // tempGrados: `${ this.temperaturaGrados }`
      tempGrados: this.temperaturaGrados
    });
  }
  
  cambiarTemp(valor: number) {
    this.temperaturaGrados += valor
    this.temperaturaGrados *= 10;
    this.temperaturaGrados = Math.ceil(this.temperaturaGrados);
    this.temperaturaGrados /= 10;
  }

  submit() {
    console.log(this.temperatura.controls.tempGrados.value);
    this.submitTemperatura.emit(this.temperatura);
  }

  volverIngreso() {
    this.router.navigate(['/usuario-ingreso']);
  }

  mostrarConsola() {
    // console.log(this.temperatura);
    // console.log(this.temperaturaGrados)
    return;
  }
}
