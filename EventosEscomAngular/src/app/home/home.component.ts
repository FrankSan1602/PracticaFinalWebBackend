import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  verEventos(): void {
    this.router.navigate(['/eventos']);
  }

  registrarAsistente(): void {
    this.router.navigate(['/asistentesForm']);
  }

  verAsistentes(): void {
    this.router.navigate(['/asistentes']);
  }

  registrarEvento(): void {
    this.router.navigate(['/eventosForm']);
  }

}
