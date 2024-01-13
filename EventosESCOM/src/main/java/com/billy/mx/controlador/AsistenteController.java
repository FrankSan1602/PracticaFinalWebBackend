package com.billy.mx.controlador;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.billy.mx.modelo.entidades.Asistente;
import com.billy.mx.modelo.entidades.Evento;
import com.billy.mx.servicios.AsistenteService;
import com.billy.mx.servicios.EmailService;

@SpringBootApplication
@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/apiAsistentes")
public class AsistenteController {
	@Autowired
	AsistenteService service;
	
	@Autowired
	EmailService emailService;

	@GetMapping("/asistentes")
	public List<Asistente> index() {
		return service.findAll();
	}

	@GetMapping("/asistentes/{id}")
	public Asistente show(@PathVariable Long id) {
		
			return service.findById(id);
		
	}

	@PostMapping("/asistentes")
	@ResponseStatus(HttpStatus.CREATED)
	public Asistente create( @RequestBody Asistente asistente) {

		return service.save(asistente);
	}

	@PutMapping("/asistentes/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Asistente update( @RequestBody Asistente asistente,
			@PathVariable Long id) {
		Asistente asistenteActual = service.findById(id);
		Asistente asistenteActualizado = null;
		

		
			asistenteActual.setNombre(asistente.getNombre());
			asistenteActual.setPaterno(asistente.getPaterno());
			asistenteActual.setMaterno(asistente.getMaterno());
			asistenteActual.setEmail(asistente.getEmail());
			asistenteActual.setFechaRegistro(asistente.getFechaRegistro());
			// Falta el listado de Categorias
			asistenteActual.setIdEvento(asistente.getIdEvento());
			asistenteActualizado = service.save(asistenteActual);
		

		return asistenteActualizado;
	}

	@DeleteMapping("/asistentes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		
			service.delete(id);
		
	}

	@GetMapping("/asistentes/eventos")
	public List<Evento> listarEventos() {
		return service.findAllEvento();
	}

	@GetMapping(value = "/asistentes/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<InputStreamResource> reporteAsistente() throws IOException {
		List<Asistente> listaDeAsistentes = (List<Asistente>) service.findAll();

		ByteArrayInputStream bis = service.reporteAsistente(listaDeAsistentes);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=listaDeProductos.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
				.body(new InputStreamResource(bis));
	}

}
