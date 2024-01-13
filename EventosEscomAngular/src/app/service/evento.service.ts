import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../model/Evento';
import Swal from 'sweetalert2';

import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private urlEndPoint: string = 'http://localhost:8081/apiEventos/eventos';
  private httpHeaders = new HttpHeaders({ ContentType: 'application/json' });

  constructor(
    private http: HttpClient,
    ) { }

  recuperarEventos(): Observable<Evento[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Evento[]));
  }

  crearEvento(evento: Evento): Observable<Evento> {
    const regex = new RegExp("(?=\-\)");
    const arr = evento.fechaCreacion.split(regex);
    console.log(arr);
    const nuevaFecha: string= `${arr[0]}${arr[1]}${this.arreglarFecha(evento.fechaCreacion)}`;
    console.log(nuevaFecha);
    evento.fechaCreacion= nuevaFecha;

    return this.http.post<Evento>(this.urlEndPoint, evento, {
      headers: this.httpHeaders,
    });
  }

  leerEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.urlEndPoint}/${id}`);
  }


  /*
    actualizarEvento(evento: Evento): Observable<Evento> {
      return this.http.put<Evento>(
        `${this.urlEndPoint}/${evento.idEvento}`,
        evento,
        {
          headers: this.httpHeaders,
        }
      );
    }
  */

  actualizarEvento(evento: Evento): Observable<Evento> {
    console.log('Llamada a actualizarEvento con los siguientes datos:', evento);
    let id: string = evento.idEvento.toString();
    console.log(`${this.urlEndPoint}/${id} es un string... creo`);

    if (typeof `${this.urlEndPoint}/${id}` == 'string') {
      return this.http.put<Evento>((this.urlEndPoint + '/' + id),
        //`${this.urlEndPoint}/${evento.idEvento}`,
        evento, { headers: this.httpHeaders, }
      ).pipe(
        catchError((error: any) => {
          console.error('Error al actualizar el evento:', error);
          // Puedes agregar un manejo de errores adicional si es necesario
          return throwError('Error al actualizar el evento');
        })
      );
    } else {
      console.log("Parece que no era un string");
      return new Observable(observador => {
        observador.complete();
      });

    }
  }


  eliminarEvento(id: number): Observable<Evento> {
    console.log('Llamada a eliminar el evento: ', id);
    console.log(`${this.urlEndPoint}/${id} es un string... creo`);

    if (typeof `${this.urlEndPoint}/${id}` == 'string') {
      return this.http.delete<Evento>((this.urlEndPoint + '/' + id),
        //`${this.urlEndPoint}/${evento.idEvento}`,
        { headers: this.httpHeaders, }
      ).pipe(
        catchError((error: any) => {
          console.error('Error al eliminar el evento:', error);
          // Puedes agregar un manejo de errores adicional si es necesario
          return throwError('Error al eliminar el evento');
        })
      );
    } else {
      console.log("Parece que no era un string");
      return new Observable(observador => {
        observador.complete();
      });

    }

    /*
    return this.http.delete<Evento>(this.urlEndPoint + '/' + id, {
      headers: this.httpHeaders,
    });
    */
  }

  arreglarFecha(fecha: string): string{
      
    const regex = new RegExp("(?=\-\)");
    const arr = fecha.split(regex);
    console.log(arr);

    const dia: string = arr[2];
    console.log(dia);
    const newDia= dia.split('-');
    const day= newDia[1].split('T00:00:00Z');
    console.log(day[0]);
    console.log(typeof day[0]);

    const d= Number(day[0])+1;

    console.log(d);
    console.log(typeof d);
    
    if(d<10){
      const diaFinal: string = '-0'+d.toString();
      console.log(diaFinal);
      return diaFinal;    
    }else if (d<32){
      const diaFinal: string = '-'+d.toString();
      console.log(diaFinal);
      return diaFinal;
    }else{
      return '-02'; 
    }
  }
}
