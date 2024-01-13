import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import { Asistente } from '../model/Asistente';
import { AsistenteService } from '../service/asistente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-asistenteform',
  templateUrl: './asistenteform.component.html',
  styleUrls: ['./asistenteform.component.css'],
})
export class AsistenteformComponent implements OnInit {
  titulo: string = 'Formulario de asistente';
  listaDeEventos: Evento[] = [];
  asistente: Asistente = new Asistente();
  constructor(
    private asistenteService: AsistenteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.asistenteService
        .leerAsistente(id)
        .subscribe((elAsistente) => (this.asistente = elAsistente));
    });
    this.asistenteService
      .obtenerEventos()
      .subscribe(
        (eventosRecuperados) => (this.listaDeEventos = eventosRecuperados)
      );
  }

  registrarAsistente(): void {
    this.asistenteService.crearAsistente(this.asistente)
      .subscribe((elAsistente) => {
        this.router.navigate(['/asistentes']);
      });
    Swal.fire({
      title: 'Registrar Asistente',
      text: `${this.asistente.nombre} Se ha registrado correctamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      showCloseButton: true,
    }).then((aceptado) => {
      if(aceptado.isConfirmed){
        return this.emailService.enviarCorreo(this.asistente, false).subscribe(
          (respuesta) =>{
            console.log('Respuesta del servidor:', respuesta);
          }, (error) =>{
            console.error('Error a enviar el correo:', error);
          }, () => {
            console.log('La operación se completó.');
          }
        );
      }else{
        return this.emailService.enviarCorreo(this.asistente, false);
      }
    });
  }

  actualizarAsistente(): void {
    this.asistenteService
      .actualizarAsistente(this.asistente)
      .subscribe((elAsistente) => {
        this.router.navigate(['/asistentes']);
      });
    Swal.fire(
      'Actualizar Asistente',
      `${this.asistente.nombre} Se ha actualizado correctamente.`,
      'success'
    );
  }

  verAsistentes(): void {
    this.router.navigate(['/asistentes']);
  }

}
