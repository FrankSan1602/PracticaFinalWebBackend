package com.billy.mx.servicios;

public interface EmailService {
	void sendSimpleMessage(String to, String subject, String text);
	
}
