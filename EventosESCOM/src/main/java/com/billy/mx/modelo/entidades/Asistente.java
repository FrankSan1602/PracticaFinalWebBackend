package com.billy.mx.modelo.entidades;
import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Asistente", schema = "public")
public class Asistente implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idasistente", nullable = false)
	private Long idAsistente;
	
	@NotBlank(message = "no debe estar vacio ")
	@Size(min=2, max = 100, message = "El valor debe tener entre 2 y 100")
	@Column(name = "nombre", length = 100, nullable = false)
	private String nombre;
	
	@NotBlank(message = "no debe estar vacio ")
	@Size(min=2, max = 100, message = "El valor debe tener entre 2 y 100")
	@Column(name = "paterno", length = 100, nullable = false)
	private String paterno;
	
	@NotBlank(message = "no debe estar vacio ")
	@Size(min=2, max = 100, message = "El valor debe tener entre 2 y 100")
	@Column(name = "materno", length = 100, nullable = false)
	private String materno;
	

	@NotBlank(message = "no debe estar vacio ")
	@Size(min=2, max = 200, message = "El valor debe tener entre 2 y 200")
	@Email(message = "Agrega un correo electrónico ")
	@Column(name = "email", length = 200, nullable = false)
	private String email;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "fechaRegistro", nullable = false)
	private Date fechaRegistro;
	
	//@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@ManyToOne
	@JoinColumn(name="idEvento")
	//@JsonProperty(access = Access.WRITE_ONLY)
	private Evento idEvento;
	
}
