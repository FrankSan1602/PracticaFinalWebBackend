import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Asistente } from '../model/Asistente';
import { Evento } from '../model/Evento';

import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {
  private urlEndPoint: string =
    'http://localhost:8081/apiAsistentes/asistentes';
  
  private urlEventos: string= 'http://localhost:8081/apiEventos/eventos';
  private httpHeaders = new HttpHeaders({ ContentType: 'application/json' });
  constructor(
    private http: HttpClient,
    //private emailService: EmailService,
    ) {}

  recuperarAsistente(): Observable<Asistente[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Asistente[]));
  }

  crearAsistente(asistente: Asistente): Observable<Asistente> {
    const regex = new RegExp("(?=\-\)");
    const arr = asistente.fechaRegistro.split(regex);
    console.log(arr);
    const nuevaFecha: string= `${arr[0]}${arr[1]}${this.arreglarFecha(asistente.fechaRegistro)}`;
    console.log(nuevaFecha);
    asistente.fechaRegistro= nuevaFecha;

    //asistente.eventos.push(asistente.idEvento);
    //console.log(asistente.eventos);

    return this.http.post<Asistente>(this.urlEndPoint, asistente, {
      headers: this.httpHeaders,
    });
  }

  leerAsistente(id: number): Observable<Asistente> {
    return this.http.get<Asistente>(`${this.urlEndPoint}/${id}`);
  }

  actualizarAsistente(asistente: Asistente): Observable<Asistente> {
    console.log('Llamada a actualizarAsistente con los siguientes datos:', asistente);
    let id: string = asistente.idAsistente.toString();
    console.log(`${this.urlEndPoint}/${id} es un string... creo`);

    if (typeof `${this.urlEndPoint}/${id}` == 'string') {
      //this.emailService.enviarCorreo(asistente);

      return this.http.put<Asistente>((this.urlEndPoint + '/' + id),
        //`${this.urlEndPoint}/${evento.idEvento}`,
        asistente, { headers: this.httpHeaders, }
      ).pipe(
        catchError((error: any) => {
          console.error('Error al actualizar el asistente: ', error);
          // Puedes agregar un manejo de errores adicional si es necesario
          return throwError('Error al actualizar el asistente.');
        })
      );
    } else {
      console.log("Parece que no era un string");
      return new Observable(observador => {
        observador.complete();
      });

    }
  }

  eliminarAsistente(id: number): Observable<Asistente> {
    return this.http.delete<Asistente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlEventos);
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
