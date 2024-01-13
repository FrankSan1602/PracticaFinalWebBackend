package com.billy.mx.modelo.entidades;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "Evento", schema = "public")
public class Evento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idEvento", nullable = false)
	private Long idEvento;

	@NotEmpty(message = "No puede estar vacio")
	@Size(min = 4, max = 250, message = "El valor debe estar entre 4 y 250 ")
	@Column(name = "nombreEvento", length = 250, nullable = false)
	private String nombreEvento;

	@NotEmpty(message = "No puede estar vacio")
	@Size(min = 5, max = 250, message = "El valor debe estar entre 5 y 250 ")
	@Column(name = "descripcionEvento", length = 250, nullable = false)
	private String descripcionEvento;

	@NotNull(message = "No puede estar vacio")
	@Temporal(TemporalType.DATE)
	@Column(name = "fechaCreacion")
	private Date fechaCreacion;
	
	
	@JsonIgnoreProperties(
			value={"idEvento", 
					"hibernateLazyInitializer", 
					"handler"},
			allowSetters=true)
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "idEvento", cascade = CascadeType.ALL)
	//@OneToMany(mappedBy = "idEvento", cascade = CascadeType.ALL)
	private Set<Asistente> asistentes = new HashSet<>();

	public void setIdEvento(Long idEvento) {
		this.idEvento = idEvento;
	}

	public void setNombreEvento(String nombreEvento) {
		this.nombreEvento = nombreEvento;
	}

	public void setDescripcionEvento(String descripcionEvento) {
		this.descripcionEvento = descripcionEvento;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public void setAsistentes(Set<Asistente> asistentes) {
		this.asistentes = asistentes;
		for (Asistente asistente : asistentes) {
			asistente.setIdEvento(this);
		}
	}
}
