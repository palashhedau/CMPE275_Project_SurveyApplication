package com.tools.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class EmailSenderService {
	
	@Autowired
	private JavaMailSender sender;

	
	public void demoEmail() throws MessagingException {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo("palashhedau900@gmail.com");
		helper.setText("ander dekh");
		helper.setSubject("Hi");
		sender.send(message);

	}

}
