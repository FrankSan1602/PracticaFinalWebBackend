import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import { Asistente } from '../model/Asistente';
import { AsistenteService } from '../service/asistente.service';
import { EventoService } from '../service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventoform',
  templateUrl: './eventoform.component.html',
  styleUrls: ['./eventoform.component.css']
})
export class EventoformComponent implements OnInit{
  titulo: string = 'Formulario de creación de eventos';
  listaDeEventos: Evento[] = [];
  evento: Evento = new Evento();
  constructor(
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.eventoService
        .leerEvento(id)
        .subscribe((elEvento) => (this.evento = elEvento));
    });

    this.eventoService
      .recuperarEventos()
      .subscribe(
        (eventosRecuperados) => (this.listaDeEventos = eventosRecuperados)
      );

    }

  registrarEvento(): void {
    this.eventoService
      .crearEvento(this.evento)
      .subscribe((elEvento) => {
        this.router.navigate(['/eventos']);
      });
    Swal.fire(
      'Registrar Evento',
      `${this.evento.nombreEvento} se ha registrado correctamente.`,
      'success'
    );
  }

  /*
  actualizarEvento(): void {
    this.eventoService
      .actualizarEvento(this.evento)
      .subscribe((elEvento) => {
        this.router.navigate(['/eventosForm',elEvento.idEvento]);
      });
    Swal.fire(
      'Actualizar Evento',
      `${this.evento.nombreEvento} se ha actualizado correctamente.`,
      'success'
    );
  }
  */

  actualizarEvento(): void {
    this.eventoService.actualizarEvento(this.evento).subscribe((elEvento) => {
      Swal.fire(
        'Actualizar Evento',
        `${this.evento.nombreEvento} se ha actualizado correctamente.`,
        'success'
      );

      // Navegar a la página de creación de registros de eventos
      this.router.navigateByUrl('/eventos');
    });
  }

  verEventos(): void {
    this.router.navigate(['/eventos']);
  }

}
