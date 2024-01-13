package com.billy.mx.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.billy.mx.modelo.entidades.Evento;
import com.billy.mx.modelo.repositorios.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService{
	@Autowired
	EventoRepository eventoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<Evento> findAll() {
		return (List<Evento>) eventoRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Evento findById(Long id) {
		return eventoRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Evento save(Evento evento) {
		return eventoRepository.save(evento);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		eventoRepository.deleteById(id);

	}


}
