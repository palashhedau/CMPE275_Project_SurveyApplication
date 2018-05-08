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
	public void sendVerificationEmail(String code, String email) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		message.setContent(composeSignUpEmail(code), "text/html; charset=utf-8");
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setSubject("Verify your account!");
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
	
	
	public String composeActivationSuccessfulEmail(String email) {
		String message = "";
		message += "<body style=\"background-color: #ccffcc\"><center> <h1 style=\"font-family: Arial; color:#3399ff;\"> SurveyApe </h1> \n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> Your account was successfully activated </h2> \n" + 
				"\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> Your username is <span style=\"font-size: 28px; color:#ff9966;\">";
		
		message+= email;
		
		message += "</span></h2>\n" + 
				"</center>\n" + 
				"</body>\n" + 
				"";
		return message;
	}
	
	public String composeSurveySubmitSuccessfulEmail(String surveyName) {
		String message = "";
		message += "<body style=\"background-color: #ccffcc\"><center> <h1 style=\"font-family: Arial; color:#3399ff;\"> SurveyApe </h1> \n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> You have successfully submitted survey "+
				surveyName+" </h2>";
		
		message += "</center>\n" + 
				"</body>\n" + 
				"";
		return message;
	}
	
	public String composeInviteSurveyEmail(String url) {
		String message = "";
		message += "<body style=\"background-color: #ccffcc\"><center> <h1 style=\"font-family: Arial; color:#3399ff;\"> SurveyApe </h1> \n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> You are invited to take the survey. You can take the survey with following link: "+
				url+" </h2>";
		
		message += "</center>\n" + 
				"</body>\n" + 
				"";
		return message;
	}
	
	@Async
	public void inviteEmail(String email, String url) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		message.setContent(composeInviteSurveyEmail(url), "text/html; charset=utf-8");
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setText("invite URL: "+url);
		helper.setSubject("Invitation to take survey in SurveyApe");
		javaMailSender.send(message);

	}
	
	@Async
	public void sendActivationSuccessfulEmail(String username, String email) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		message.setContent(composeActivationSuccessfulEmail(username), "text/html; charset=utf-8");
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setSubject("Account successfully activated!");
		javaMailSender.send(message);
	}
	
	@Async
	public void surveySubmitEmail(String email, String surveyName) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		message.setContent(composeSurveySubmitSuccessfulEmail(surveyName), "text/html; charset=utf-8");
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setSubject("Survey successfully submitted");
		javaMailSender.send(message);

	}

}
