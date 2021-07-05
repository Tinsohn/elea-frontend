import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit {
  checked: boolean = true;

  loading: boolean = false;
  
  ngOnInit(): void {
    localStorage.clear();
  }

  isLoading(event) {
    this.loading = event;
  }
}
