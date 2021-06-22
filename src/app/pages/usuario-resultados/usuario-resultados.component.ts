import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-resultados',
  templateUrl: './usuario-resultados.component.html',
  styleUrls: ['./usuario-resultados.component.css']
})
export class UsuarioResultadosComponent implements OnInit {

  isHabilitado: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
