package com.billy.mx.servicios;

import java.util.List;

import com.billy.mx.modelo.entidades.Evento;


public interface EventoService {
	public List<Evento> findAll();
	public Evento findById(Long id);
	public Evento save(Evento evento);
	public void delete(Long id);
	
}
