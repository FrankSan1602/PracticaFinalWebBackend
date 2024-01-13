import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Asistente } from '../model/Asistente';
import { Email } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private urlEndPoint: string = 'http://localhost:8081/apiEmail/enviar';
  private httpHeaders = new HttpHeaders({ ContentType: 'application/json' });

  constructor(
    private http: HttpClient,
  ) { }

  enviarCorreo(destinatario: Asistente, actu: boolean): Observable<Email>{
    let estado: string=``;
    let texto: string=``;
    if(actu){
      estado= 'Actualización';
      texto= `Estimado asistente, si recibiste este correo, posiblemente no todos los datos fueron cambiados, por lo que se presentan todos tus datos para que puedas verificar cuáles se actualizaron.\n
      -Nombre: ${destinatario.nombre}
      -Paterno: ${destinatario.paterno}
      -Materno: ${destinatario.materno}
      -Correo electrónico: ${destinatario.email}
      -Fecha de registro (debido a la zona horaria, resta un día a la fecha): ${destinatario.fechaRegistro}   
      -Tu nuevo evento ahora es "${destinatario.idEvento.nombreEvento}", el cual consiste en "${destinatario.idEvento.descripcionEvento}".\n
      \nAtentamente, Antitesis.`;
    }else{
      estado= 'Información';
      texto= `Estimado asistente, si recibiste este correo, es porque fuiste inscrito a un espectacular evento con los siguientes datos:\n
               -Nombre: ${destinatario.nombre}
               -Paterno: ${destinatario.paterno}
               -Materno: ${destinatario.materno}
               -Correo electrónico: ${destinatario.email}
               -Fecha de registro (debido a la zona horaria, resta un día a la fecha): ${destinatario.fechaRegistro}   
               -Tu evento es "${destinatario.idEvento.nombreEvento}", el cual consiste en "${destinatario.idEvento.descripcionEvento}".\n
               \nAtentamente, Antitesis.`;
    }
    console.log('Llamada a actualizarAsistente con los siguientes datos:', destinatario);
    const correo: Email={
      destinatario: `${destinatario.email}`,
      asunto: `${estado}: inscripción de evento`,
      cuerpo: texto,
    }

    console.log('Llamada a actualizarAsistente con los siguientes datos:', correo);
    return this.http.post<Email>(this.urlEndPoint, correo, {
      headers: this.httpHeaders,
    });
  }
}
