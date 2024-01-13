import { Component, OnInit } from '@angular/core';
import { Asistente } from '../model/Asistente';
import { AsistenteService } from '../service/asistente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../service/email.service';
import Swal from 'sweetalert2';
import { Evento } from '../model/Evento';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css'],
})
export class AsistenteComponent implements OnInit {
  titulo: string = 'Listado de Asistentes';
  listaDeAsistentes: Asistente[] = [];
  listaDeEventos: Evento[] = [];

  selectedEventoId: number = 0;

  constructor(
    private asistenteService: AsistenteService,
    private emailService: EmailService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.asistenteService
      .recuperarAsistente()
      .subscribe((lista) => (this.listaDeAsistentes = lista));

    this.asistenteService
      .obtenerEventos()
      .subscribe(
        (eventosRecuperados) => (this.listaDeEventos = eventosRecuperados)
      );
  }

  verEventos(): void {
    this.router.navigate(['/eventos']);
  }

  registrarAsistente(): void {
    this.router.navigate(['/asistentesForm']);
  }


  update(asistente: Asistente, listaDeEventos: Evento[]): void {
    const optionsHTML = listaDeEventos.map(ev => `<option [ngValue]="ev">${ev.nombreEvento}</option>`).join('');

    Swal.fire({
      title: 'Actualizar Asistente',
      html: `
      <div class="card-body text-primary table-responsive">
        <form id="actuAsist">
          <div class="mb-3">
            <label for="nombreNew">Nuevo nombre(s)</label>
            <input
              type="text"
              class="form-control"
              name="nombreNew"
              value="${asistente.nombre.split(' ').join(' ')}"
              [(ngModel)]="asistente.nombre"
            />
          </div>

          <div class="mb-3">
            <label for="paternoNew">Nuevo apellido paterno</label>
            <input
              type="text"
              class="form-control"
              name="paternoNew"
              value="${asistente.paterno.split(' ').join(' ')}"
              [(ngModel)]="asistente.paterno"
            />
          </div>

          <div class="mb-3">
            <label for="maternoNew">Nuevo apellido materno</label>
            <input
              type="text"
              class="form-control"
              name="maternoNew"
              value="${asistente.materno.split(' ').join(' ')}"
              [(ngModel)]="asistente.materno"
            />
          </div>

          <div class="mb-3">
            <label for="emailNew">Nuevo correo electrónico (e-mail)</label>
            <input
              type="text"
              class="form-control"
              name="emailNew"
              value="${asistente.email.split(' ').join(' ')}"
            />
          </div>

          <div class="mb-3">
            <label for="fechaNew">Nueva fecha de registro</label>
            <input
              type="date"
              class="form-control"
              name="fechaNew"
              value="${asistente.fechaRegistro.split(' ').join(' ')}"
            />
          </div>

          <div class="mb-3">
            <label for="eventosName">Reemplazar Evento</label>
            <select
              class="form-control"
              [attr.value]="asistente.idEvento.idEvento"
              (change)="asistente.idEvento.idEvento = $event.target.value"
              name="eventosName"
              id="eventosName"
            >
              <option [ngValue]="">${asistente.idEvento.nombreEvento}</option>
              ${optionsHTML}
            </select>

          </div>
        </form>
      </div>

      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar asistente',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        const formData = new FormData(document.getElementById('actuAsist') as HTMLFormElement);

        const nombre = formData.get('nombreNew') as string;
        const paterno = formData.get('paternoNew') as string;
        const materno = formData.get('maternoNew') as string;
        const email = formData.get('emailNew') as string
        const fechaRegistro = formData.get('fechaNew') as string;
        const mySelect = formData.get('eventosName') as string;

        //const check = formData.get('addEvento') as string;

        //document.getElementById("eventosName") as HTMLSelectElement;
        //const mySelect = document.getElementById("eventosName") as HTMLSelectElement;

        console.log(mySelect);

        //const selectedOption = mySelect.options[mySelect.selectedIndex];
        //console.log(selectedOption)
        //const selectedData = selectedOption.value;

        //console.log(selectedData, typeof selectedData);
        //const selectedValue = mySelect.value;
        /*
                const form = document.getElementById('actuAsist');
                const select = form.elements.namedItem('miSelect') as HTMLSelectElement;
                const valorSeleccionado = select.value;
          */
        //const seleccionado= formData.get('eventosName') as string;

        //const eventoSeleccionado = this.selectedEventoId; // Utilizar el valor seleccionado del ngModel
        const idEvento = listaDeEventos.find(event => event.nombreEvento === mySelect) as Evento;
        /*
        const idEvento: Evento={
          idEvento: evento.idEvento,
          nombreEvento: evento.nombreEvento,
          descripcionEvento: evento.descripcionEvento,
          fechaCreacion: evento.fechaCreacion
        }
        */
        console.log('El evento seleccionado tiene este contenido: ' + idEvento);

        /*
                const idEvento={
                  idEvento: eventoSeleccionado.id,
                  nombreEvento: nombreEvento,
                  descripcionEvento: descripcionEvento,
                  fechaCreacion: nuevaFecha,
                }
        
                console.log(idEvento);
        */
        const regex = new RegExp("(?=\-\)");
        const arr = fechaRegistro.split(regex);
        console.log(arr);
        /*
                const dia: string = arr[2];
                console.log(dia);
                const newDia= dia.split('-');
        */
        const nuevaFecha: string = `${arr[0]}${arr[1]}${this.arreglarFecha(fechaRegistro)}`;

        //Aquí iría un código que añade o reemplaza el evento, pero no funcionó


        const asistenteNuevo = {
          idAsistente: asistente.idAsistente,
          nombre: nombre,
          paterno: paterno,
          materno: materno,
          email: email,
          fechaRegistro: nuevaFecha,
          idEvento: idEvento,
          eventos: asistente.eventos,
        };

        return Swal.fire({
          title: 'Confirmación de datos',
          html:
            `
          <p>Nombre: ${nombre}</p>
          <p>Paterno: ${paterno}</p>
          <p>Materno: ${materno}</p>
          <p>Email: ${email}</p>
          <p>Fecha de Registro: ${fechaRegistro}</p>
          <p>Evento registrado: ${idEvento.nombreEvento}</p>
          `,
          icon: 'info',

          showCancelButton: true,
          confirmButtonText: '¡Confirmar!',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            //console.log(id, nombreEvento, descripcionEvento, fechaCreacion);
            return this.asistenteService.actualizarAsistente(asistenteNuevo).
            subscribe(
                (respuesta) => {
                  console.log('Respuesta del servidor:', respuesta);

                }, (error) => {
                  console.error('Error al actualizar el registro:', error);
                  Swal.fire({
                    title: 'Error al actualizar',
                    text: 'Ocurrió algo inesperado y el registro no se actualizó.',
                    icon: 'error',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar'
                  }).then((aceptado) => {
                    if (aceptado.isConfirmed) {
                      this.reloadPage();
                    }
                  });    
                }, () => {
                  console.log('La operación se completó satisfactoriamente.')
                }
              ),            
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El asistente se actualizó satisfactoriamente.',
                icon: 'success',
                showCloseButton: true,
                confirmButtonText: 'Aceptar'
              }).then((aceptado) => {
                if (aceptado.isConfirmed) {
                  console.log("Enviando correo...");
                  return this.emailService.enviarCorreo(asistente, true).subscribe(
                    (respuesta) => {
                      console.log('Respuesta del servidor:', respuesta);
                    }, (error) => {
                      console.error('Error a enviar el correo:', error);
                    }, () => {
                      console.log('La operación se completó satisfactoriamente.')
                    }
                  ), this.descargaReporte();
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

          this.router.navigateByUrl('/asistentes');

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


  delete(asistente: Asistente): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Estás apunto de eliminar un asistente, ¿quieres continuar? ¡Esta acción no se puede revertir eh!',
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
            <p>Nombre: ${asistente.nombre}</p>
            <p>Paterno: ${asistente.paterno}</p>
            <p>Materno: ${asistente.materno}</p>
            <p>Email: ${asistente.email}</p>
            <p>Fecha de Registro: ${asistente.fechaRegistro}</p>
            <p>idEvento: ${asistente.idEvento.nombreEvento}</p>
            `,

          showCancelButton: true,
          confirmButtonText: '¡Borralo ya!',
          cancelButtonText: 'Mejor no...',
          showCloseButton: true,
        });
        if (confirmacion.isConfirmed) {
          console.log(asistente.idAsistente);
          return this.asistenteService.eliminarAsistente(asistente.idAsistente).subscribe(
            (respuesta) => {
              console.log('Respuesta del servidor:', respuesta);
            }, (error) => {
              console.error('Error al actualizar el registro:', error);
            }, () => {
              console.log('La operación se completó satisfactoriamente.')
            }
          ), Swal.fire({
            title: '¡Eliminar!',
            text: `El asistente ${asistente.nombre} se eliminó satisfactoriamente.`,
            icon: 'success',
          }).then((aceptado) => {
            if (aceptado.isConfirmed) {
              this.reloadPage();
            }
          });
        } else {
          return Swal.fire({
            title: 'Eliminación cancelada',
            text: 'Cancelaste la eliminación del registro.',
            icon: 'info',
          });
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.router.navigateByUrl('/asistentes');
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

  descargaReporte() {
    this.http.get('http://localhost:8081/apiAsistentes/asistentes/pdf', {responseType: 'blob'})
      .subscribe(data => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      }); 
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

}
