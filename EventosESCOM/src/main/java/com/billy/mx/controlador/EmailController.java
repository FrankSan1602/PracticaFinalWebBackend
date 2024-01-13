package com.billy.mx.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.billy.mx.modelo.entidades.Email;

@SpringBootApplication
@RestController
@CrossOrigin(origins = { "*" })
@RequestMapping("/apiEmail")
public class EmailController {
	@Autowired
	private JavaMailSender emailSender;
	
	@PostMapping("/enviar")
	@ResponseStatus(HttpStatus.CREATED)
	public String enviarCorreo(@RequestBody Email correo) {
		SimpleMailMessage mensaje = new SimpleMailMessage();
		mensaje.setTo(correo.getDestinatario());
		mensaje.setSubject(correo.getAsunto());
		mensaje.setText(correo.getCuerpo());
		
		mensaje.setFrom("La Antitesis <laantitesis616@gmail.com>");
		
		emailSender.send(mensaje);
		
		return "Correo enviado a "+ correo.getDestinatario();
	}
}
