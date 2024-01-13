package com.billy.mx.modelo.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.billy.mx.modelo.entidades.Asistente;
import com.billy.mx.modelo.entidades.Evento;


public interface AsistenteRepository extends JpaRepository<Asistente, Long>{

	@Query("from Evento")
	public List<Evento> findAllEventos();
	
}
