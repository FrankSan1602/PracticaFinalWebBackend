import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import Swal from 'sweetalert2';
import { EventoService } from '../service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  titulo: string = 'Listado de Eventos';
  listaDeEventos: Evento[] = [];
  /*[
    {
      idEvento: 1,
      nombreEvento: 'posada',
      descripcionEvento: 'venir en pijama',
      fechaCreacion: '2023-12-19',
    },
    {
      idEvento: 2,
      nombreEvento: 'piñata',
      descripcionEvento: 'romper la piñata',
      fechaCreacion: '2023-12-19',
    },
    {
      idEvento: 3,
      nombreEvento: 'villancicos',
      descripcionEvento: 'cantar muucho',
      fechaCreacion: '2023-12-19',
    },
  ];*/
  constructor(
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.eventoService
      .recuperarEventos()
      .subscribe((lista) => (this.listaDeEventos = lista));
  }

  update(id: number): void {
    Swal.fire({
      title: 'Actualizar evento',
      html: `
      <div class="card-body text-primary table-responsive">
      <form id="actualizacion">
        <div class="mb-3">
          <label for="nombreEvNew">Nuevo nombre del Evento</label>
          <input
            type="text"
            class="form-control"
            name="nombreEvNew"
            [(ngModel)]="evento.nombreEvento"
          />
        </div>

        <div class="mb-3">
          <label for="descripcionNew">Nueva descripción del Evento</label>
          <input
            type="text"
            class="form-control"
            name="descripcionNew"
            [(ngModel)]="evento.descripcionEvento"
          />
        </div>

        <div class="mb-3">
          <label for="fechaCrNew">Nueva Fecha de Creación (YYYY-MM-DD)</label>
          <input
            type="date"
            class="form-control"
            name="fechaCrNew"
            [(ngModel)]="evento.fechaCreacion"
          />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar evento',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        const formData = new FormData(document.getElementById('actualizacion') as HTMLFormElement);

        const nombreEvento = formData.get('nombreEvNew') as string;
        const descripcionEvento = formData.get('descripcionNew') as string;
        const fechaCreacion = formData.get('fechaCrNew') as string;

        const regex = new RegExp("(?=\-\)");
        const arr = fechaCreacion.split(regex);
        console.log(arr);
        /*
                const dia: string = arr[2];
                console.log(dia);
                const newDia= dia.split('-');
        */
        const nuevaFecha: string = `${arr[0]}${arr[1]}${this.arreglarFecha(fechaCreacion)}`;

        const eventoNuevo = {
          idEvento: id,
          nombreEvento: nombreEvento,
          descripcionEvento: descripcionEvento,
          fechaCreacion: nuevaFecha,
        };

        return Swal.fire({
          title: 'Confirmación de datos',
          html:
            `
          <p>Nombre: ${nombreEvento}</p>
          <p>Descripcion: ${descripcionEvento}</p>
          <p>Fecha Creacion: ${fechaCreacion}</p>
          `,
          icon: 'info',

          showCancelButton: true,
          confirmButtonText: '¡Confirmar!',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(id, nombreEvento, descripcionEvento, fechaCreacion);
            return this.eventoService.actualizarEvento(eventoNuevo).subscribe(
              (respuesta) => {
                console.log('Respuesta del servidor:', respuesta);

              }, (error) => {
                console.error('Error al actualizar el registro:', error);
              }, () => {
                console.log('La operación se completó satisfactoriamente.')
              }
            ),
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El evento se actualizó satisfactoriamente.',
                icon: 'success',
                showCloseButton: true,
                confirmButtonText: 'Aceptar'
              }).then((aceptado) => {
                if (aceptado.isConfirmed) {
                  this.reloadPage();
                }
              });
          } else {
            Swal.fire({
              title: 'Cancelado por el usuario',
              text: 'Cancelaste la actualización.',
              showCloseButton: true,
              confirmButtonText: 'Aceptar'
            });
            throw new Error('Cancelado por el usuario');
          }
        });

      },
    }).then((result) => {
      if (result.isConfirmed) {
        try {

          this.router.navigateByUrl('/eventos');

        } catch {
          Swal.fire({
            title: '¡ERROR!',
            text: 'Ocurrió un error al redireccionar.',
            icon: 'error',
          });
        }
      }
    })
  }


  delete(evento: Evento): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Estás apunto de eliminar un registro, ¿quieres continuar? ¡Esta acción no se puede revertir eh!',
      icon: 'question',

      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: async () => {
        const confirmacion = await Swal.fire({
          title: '¿Estas seguro? Confirma que estos sean los datos que quieres eliminar.',
          icon: 'warning',
          html:
            `
            <p>Nombre: ${evento.nombreEvento}</p>
            <p>Materno: ${evento.descripcionEvento}</p>
            <p>Fecha de creación: ${evento.fechaCreacion}</p>
            `,

          showCancelButton: true,
          confirmButtonText: '¡Borralo ya!',
          cancelButtonText: 'Mejor no...',
          showCloseButton: true,
        });
        if (confirmacion.isConfirmed) {
          console.log(evento.idEvento);
          return this.eventoService.eliminarEvento(evento.idEvento).subscribe(
            (respuesta) => {
              console.log('Respuesta del servidor:', respuesta);
            }, (error) => {
              console.error('Error al actualizar el registro:', error);
            }, () => {
              console.log('La operación se completó satisfactoriamente.')
            }
          ), Swal.fire({
            title: '¡Eliminar!',
            text: 'El registro se eliminó satisfactoriamente.',
            icon: 'success',
          }).then((aceptado) => {
            if (aceptado.isConfirmed) {
              this.reloadPage();
            }
          });
        } else {
          return Swal.fire({
            title: 'Eliminación cancelada',
            text: 'Cancelaste la eliminación el registro.',
            icon: 'info',
          });
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.router.navigateByUrl('/eventos');
        } catch {
          Swal.fire({
            title: '¡ERROR!',
            text: 'Ocurrió un error al redireccionar.',
            icon: 'error',
          });
        }
      }
    });
  }

  verAsistentes(): void {
    this.router.navigate(['/asistentes']);
  }
  
  descargaReporte() {
    this.http.get('http://localhost:8081/apiEventos/eventos/pdf', {responseType: 'blob'})
      .subscribe(data => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      }); 
  }

  registrarEvento(): void {
    this.router.navigate(['/eventosForm']);
  }

  reloadPage() {
    window.location.reload();
  }

  arreglarFecha(fecha: string): string {

    const regex = new RegExp("(?=\-\)");
    const arr = fecha.split(regex);
    console.log(arr);

    const dia: string = arr[2];
    console.log(dia);
    const newDia = dia.split('-');
    const day = newDia[1].split('T00:00:00Z');
    console.log(day[0]);
    console.log(typeof day[0]);

    const d = Number(day[0]) + 1;

    console.log(d);
    console.log(typeof d);

    if (d < 10) {
      const diaFinal: string = '-0' + d.toString();
      console.log(diaFinal);
      return diaFinal;
    } else if (d < 32) {
      const diaFinal: string = '-' + d.toString();
      console.log(diaFinal);
      return diaFinal;
    } else {
      return '-02';
    }
  }
  /*
      3/4 (idEvento) ------IMPLEMENTAR ACTU DE ASISTENTES
      DONE---------ARREGLO DE FECHA EN REGISTRAR EVENTO
      DONE---------ELIMINAR ASISTENTE
      ---------ARREGLAR LA FECHA PARA ASISTENTES
      
      AÑADIR BOTONES EN /HOME
      HACER FUNCIONAR EL EMAIL
  
      SÍ PERO NO TANTO-------------ARREGLAR EL IDEVENTO DE ASISTENTES (IDEVENTO=EVENTO COMPLETO)
        EL ARRAY DE EVENTOS EN ASISTENTES VA ULTRA MAL Y SIEMPRE QUE SE HAGA UNA
        ACTUALIZACIÓN SE REEMPLAZARÁ EL EVENTO ASOCIADO.
  */
}
