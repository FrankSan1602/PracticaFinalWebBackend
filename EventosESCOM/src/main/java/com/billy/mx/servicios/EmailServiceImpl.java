package com.billy.mx.servicios;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService{
	@Autowired
    private JavaMailSender emailSender;

    @Value("../../../../../resources/static/img/eternity_reverse.jpg")
    Resource resourceFile;

	@Override
	public void sendSimpleMessage(String to, String subject, String text) {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper;
	try {
		helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setFrom(new InternetAddress("noreply-pruebasESCOM@gmail.com", "Eventos ESCOM"));			
	        helper.addAttachment("archivo", new File(resourceFile.getFile().toURI()));
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(text);
			emailSender.send(message);
	} catch (MessagingException e) {
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
		
	}
}
