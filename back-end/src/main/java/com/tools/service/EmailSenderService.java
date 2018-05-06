package com.tools.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
	
	private JavaMailSender javaMailSender;
	private HttpServletRequest request;
	
	@Autowired
	public EmailSenderService(JavaMailSender javaMailSender){
		this.javaMailSender = javaMailSender;
	}

	@Async
	public void demoEmail(String code) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		message.setContent(composeSignUpEmail(code), "text/html; charset=utf-8");
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo("emailprateeksharma@gmail.com");
		helper.setSubject("Hi");
		javaMailSender.send(message);
	}
	
	public String composeSignUpEmail(String code) {
		String message = "";
		message += "<body style=\"background-color: #ccffcc\"><center> <h1 style=\"font-family: Arial; color:#3399ff;\"> SurveyApe </h1> \n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> Your account was successfully created </h2> \n" + 
				"\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> Your verification code is <span style=\"font-size: 28px; color:#ff9966;\">";
		
		message+= code;
		
		message += "</span></h2>\n" + 
				"</center>\n" + 
				"</body>\n" + 
				"";
		return message;
	}

}
