package com.tools.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
	
	private JavaMailSender javaMailSender;
	
	@Autowired
	public EmailSenderService(JavaMailSender javaMailSender){
		this.javaMailSender = javaMailSender;
	}

	@Async
	public void demoEmail() throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo("emailprateeksharma@gmail.com");
		helper.setText("ander dekh");
		helper.setSubject("Hi");
		javaMailSender.send(message);
	}
	
	@Async
	public void inviteEmail(String email, String url) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setText("invite URL: "+url);
		helper.setSubject("Invitation to take survey innSurveyApe");
		javaMailSender.send(message);
	}

}
