import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-autoevaluacion',
  templateUrl: './autoevaluacion.component.html',
  styleUrls: ['./autoevaluacion.component.css']
})
export class AutoevaluacionComponent implements OnInit, OnDestroy{

  constructor() { }

  ngOnInit(): void {
    // localStorage.setItem('prueba', 'soy una prueba!')
  }

  ngOnDestroy(): void{
    // localStorage.clear();
  }
}