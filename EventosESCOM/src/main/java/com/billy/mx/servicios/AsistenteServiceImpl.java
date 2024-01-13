package com.billy.mx.servicios;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.billy.mx.modelo.entidades.Asistente;
import com.billy.mx.modelo.entidades.Evento;
import com.billy.mx.modelo.repositorios.AsistenteRepository;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class AsistenteServiceImpl implements AsistenteService{
	@Autowired
	AsistenteRepository dao;

	@Override
	@Transactional(readOnly = true)
	public List<Asistente> findAll() {
		return (List<Asistente>) dao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Asistente> findAll(Pageable pageable) {
		return dao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Asistente findById(Long id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Asistente save(Asistente asistente) {
		return dao.save(asistente);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		dao.deleteById(id);

	}

	@Override
	public List<Evento> findAllEvento() {
		return dao.findAllEventos();
	}

	@Override
	@Transactional(readOnly = true)
	public ByteArrayInputStream reporteAsistente(List<Asistente> asistentes) {
		Document documento = new Document();
		ByteArrayOutputStream salida = new ByteArrayOutputStream();
		try {
			PdfWriter.getInstance(documento, salida);
			documento.open();
			Font tipoLetra = FontFactory.getFont(FontFactory.COURIER, 14, BaseColor.BLUE);
			Paragraph parrafo = new Paragraph("Lista de Asistentes", tipoLetra);
			parrafo.setAlignment(Element.ALIGN_CENTER);
			documento.add(parrafo);
			documento.add(Chunk.NEWLINE);
			Font textFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,9);
			
			PdfPTable tabla = new PdfPTable(4);
			Stream.of("Nombre","Paterno","Materno", "Evento").forEach(headerTitle ->{
				PdfPCell header = new PdfPCell();
				Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,9);
				header.setBackgroundColor(BaseColor.LIGHT_GRAY);
				header.setHorizontalAlignment(Element.ALIGN_CENTER);
				header.setBorderWidth(1);
				header.setPhrase(new Phrase(headerTitle, headerFont));
				tabla.addCell(header);
			});
			for(Asistente p: asistentes) {
				
				PdfPCell celdaNombre = new PdfPCell(new Phrase(p.getNombre(), textFont));
				celdaNombre.setPadding(1);
				celdaNombre.setVerticalAlignment(Element.ALIGN_MIDDLE);
				celdaNombre.setHorizontalAlignment(Element.ALIGN_LEFT);
				tabla.addCell(celdaNombre);
				
				PdfPCell celdaPaterno = new PdfPCell(new Phrase(p.getPaterno(), textFont));
				celdaPaterno.setPadding(1);
				celdaPaterno.setVerticalAlignment(Element.ALIGN_MIDDLE);
				celdaPaterno.setHorizontalAlignment(Element.ALIGN_LEFT);
				tabla.addCell(celdaPaterno);
				
				PdfPCell celdaMaterno = new PdfPCell(new Phrase(p.getMaterno(), textFont));
				celdaMaterno.setPadding(1);
				celdaMaterno.setVerticalAlignment(Element.ALIGN_MIDDLE);
				celdaMaterno.setHorizontalAlignment(Element.ALIGN_LEFT);
				tabla.addCell(celdaMaterno);
				
				PdfPCell celdaEmail = new PdfPCell(new Phrase(p.getEmail(), textFont));
				celdaEmail.setPadding(1);
				celdaEmail.setVerticalAlignment(Element.ALIGN_MIDDLE);
				celdaEmail.setHorizontalAlignment(Element.ALIGN_LEFT);
				tabla.addCell(celdaEmail);
			}
			documento.add(tabla);
			documento.close();
		}catch (DocumentException e) {
			e.printStackTrace();
		}
		
		return new ByteArrayInputStream(salida.toByteArray());
	}
	

}
