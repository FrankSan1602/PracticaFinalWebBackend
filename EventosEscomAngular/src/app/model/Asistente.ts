import { Evento } from './Evento';

export class Asistente {
  idAsistente: number = 0;
  nombre: string = '';
  paterno: string = '';
  materno: string = '';
  email: string = '';
  fechaRegistro: string = '';
  idEvento: Evento = new Evento();
  eventos: Array<Evento> = [];
}
