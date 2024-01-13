package com.billy.mx.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
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

import com.billy.mx.modelo.entidades.Evento;
import com.billy.mx.servicios.EventoService;


@SpringBootApplication
@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/apiEventos")
public class EventoController {
	@Autowired
	private EventoService service;

	@GetMapping("/eventos")
	public List<Evento> readAll() {
		return service.findAll();
	}


	@PostMapping("/eventos")
	@ResponseStatus(HttpStatus.CREATED)
	public Evento save(@RequestBody Evento evento) {
		return service.save(evento);
	}

	@GetMapping("/eventos/{id}")
	public Evento read(@PathVariable Long id) {
		return service.findById(id);
	}

	@DeleteMapping("/eventos/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

	@PutMapping("/eventos/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Evento update(@RequestBody Evento evento, @PathVariable Long id) {
		Evento c = service.findById(id);
		
		c.setNombreEvento(evento.getNombreEvento());
		c.setDescripcionEvento(evento.getDescripcionEvento());
		c.setFechaCreacion(evento.getFechaCreacion());
		
		return service.save(c);		
	}
	

}
