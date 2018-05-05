package com.tools.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.tools.helper.Helper;
import com.tools.repository.AuthRepository;
import com.tools.requestParams.Auth;
import com.tools.responseParam.Response;


@Service
public class AuthenticationService {
	
	
	@Autowired
	private AuthRepository authRepository;
	

	
	private PasswordGenerationService passwordGenerator;
	@Autowired
	private EmailSenderService emailService;
	
	
	public AuthenticationService() {
		passwordGenerator = new PasswordGenerationService();
	}
	
	public Object signup(Auth auth) throws Exception{
		
		System.out.println(auth.getEmail() + " -  " + auth.getPassword() + " - " + auth.getType());	
		emailService.demoEmail();
		if(authRepository.findByEmail(auth.getEmail()).size() > 0 ) {
			return new Response(400,"Email already exist");
		}else {
			System.out.println(passwordGenerator.getPassword("prateek"));
			System.out.println(passwordGenerator.matchPassword("$2a$10$vT4qk2/ftiO7YnxPjohju.flfU1QmYb0RzcqyMv8nfTB5yBorBgDW", "prateek"));
			com.tools.model.Auth authToSave = new com.tools.model.Auth(auth.getEmail(), auth.getPassword(),
					auth.getType() , "INACTIVE"); 
			//Generate code to activate account
			authToSave.setActivationCode("ABCD");
			authRepository.save(authToSave);
			// Send an email to the user and send the code in the mail
			return new Response(201,"User successfully registerd. Please check Email");
		}
		
	}
	
	public Object signin(Auth auth){
		
		List<com.tools.model.Auth> authList = authRepository.findByEmail(auth.getEmail());
		System.out.println("SSSS" + auth.getEmail() + authList.size());
		if(authList.size() > 0) {
			
			com.tools.model.Auth authCred = authList.get(0);
			System.out.println(authCred.getStatus());
			if(authCred.getStatus().equalsIgnoreCase("ACTIVE")) {
				//compare password
				return new Response(200 , "Successfully loggedIn");
			}else return new Response(400, "Account not activated");
		}else {
			return new Response(404 , "Email/Password Incorrect");
		}
	}

	public Object activateAccount(String email, String code) {
		System.out.println("Email " + email + " " + code);
		List<com.tools.model.Auth> authList = authRepository.findByEmailAndStatus(email,"INACTIVE");
		if(authList.size() > 0) {
			com.tools.model.Auth auth = authList.get(0);
			if(auth.getActivationCode().equals(code)) {
				//activate account
				auth.setStatus("ACTIVE");
				authRepository.save(auth);
				return new Response(200, "Account activated Succesfully");
			}
			return new Response(400,"Incorrect activation code provided") ; 
		}else return new Response(404,"No user found with the account/ Account is already activated");
		
	}

	
	
}
