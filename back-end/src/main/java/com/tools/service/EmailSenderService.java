package com.tools.service;

import java.nio.charset.StandardCharsets;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.sendgrid.*;
import java.io.IOException;

@Service
public class EmailSenderService {
	
	private JavaMailSender javaMailSender;
	private HttpServletRequest request;
	
	@Autowired
	public EmailSenderService(JavaMailSender javaMailSender){
		this.javaMailSender = javaMailSender;
	}
	
	  @Async
	  public void sendEmail(String email, String contentEmail) throws IOException {
		    Email from = new Email("admin@surveyape.com");
		    String subject = "Update from surveyAPE";
		    Email to = new Email(email);
		    Content content = new Content("text/html", contentEmail);
		    Mail mail = new Mail(from, subject, to, content);
		    SendGrid sg = new SendGrid("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\n");
		    Request request = new Request();
		    try {
		      request.setMethod(Method.POST);
		      request.setEndpoint("mail/send");
		      request.setBody(mail.build());
		      Response response = sg.api(request);
		      System.out.println(response.getStatusCode());
		      System.out.println(response.getBody());
		      System.out.println(response.getHeaders());
		    } catch (IOException ex) {
		    		System.out.println(ex);
		    }
		  }

	@Async
	public void sendVerificationEmail(String code, String email) throws MessagingException, IOException {
		sendEmail(email, composeSignUpEmail(code));
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
	public void inviteEmail(String email, String url) throws MessagingException, IOException {
		sendEmail(email, composeInviteSurveyEmail(url));
	}
	
	@Async
	public void sendActivationSuccessfulEmail(String username, String email) throws MessagingException, IOException {
		sendEmail(email, composeInviteSurveyEmail(composeActivationSuccessfulEmail(username)));
	}
	
	@Async
	public void surveySubmitEmail(String email, String surveyName) throws MessagingException, IOException {
		sendEmail(email, composeInviteSurveyEmail(composeSurveySubmitSuccessfulEmail(surveyName)));
	}
	
	@Async
	public void sendQRCodeEmail(String url, String email) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
				StandardCharsets.UTF_8.name());
		helper.setTo(email);
		helper.setSubject("Invitation to participate in survey!");
		
        MimeMultipart multipart = new MimeMultipart("related");
        BodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(composeQRCodeMessage(url), "text/html");
        multipart.addBodyPart(messageBodyPart);
        messageBodyPart = new MimeBodyPart();
        DataSource fds = new FileDataSource(url);

        messageBodyPart.setDataHandler(new DataHandler(fds));
        messageBodyPart.setHeader("Content-ID", "<image>");
        multipart.addBodyPart(messageBodyPart);
        message.setContent(multipart);		
		System.out.println(url);
		//javaMailSender.send(message);
		//sendEmail(email,message);
        String messagetest = "<img src='http://54.241.144.193/:8081/QRImages/QRcode.png'>";
	    Email from = new Email("test@example.com");
	    String subject = "Sending with SendGrid is Fun";
	    Email to = new Email(email);
	    Content content = new Content("text/html", messagetest);
	    Mail mail = new Mail(from, subject, to, content);
	    SendGrid sg = new SendGrid("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\n");
	    Request request = new Request();
	    try {
	      request.setMethod(Method.POST);
	      request.setEndpoint("mail/send");
	      request.setBody(mail.build());
	      Response response = sg.api(request);
	      System.out.println(response.getStatusCode());
	      System.out.println(response.getBody());
	      System.out.println(response.getHeaders());
	    } catch (IOException ex) {
	    		System.out.println(ex);
	    }
	}
	
	public String composeQRCodeMessage(String url) {
		String message = "";
		message += "<body style=\"background-color: #ccffcc\"><center> <h1 style=\"font-family: Arial; color:#3399ff;\"> SurveyApe </h1> \n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<br>\n" + 
				"<h2 style=\"font-family: Arial; color:#ff9966;\"> You are invited to take the survey. You can take the survey using the QR code below : "+
				"</h2>";
		message += "<img src='cid:image' style='height:100px; width:100px'/>";
		return message;
	}

}
