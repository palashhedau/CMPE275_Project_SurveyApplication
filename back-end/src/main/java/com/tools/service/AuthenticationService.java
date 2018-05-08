package com.tools.service;

import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.tools.helper.Helper;
import com.tools.repository.AuthRepository;
import com.tools.requestParams.Auth;
import com.tools.requestParams.VerifyAccount;
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
		String verificationCode = getVerificationCode();
		String hashed = passwordGenerator.getPassword(auth.getPassword());
		if(authRepository.findByEmail(auth.getEmail()).size() > 0 ) {
			return new Response(400,"Email already exist");
		}else {
			com.tools.model.Auth authToSave = new com.tools.model.Auth(auth.getEmail(), hashed,
					auth.getType() , "INACTIVE"); 
			//Generate code to activate account
			emailService.sendVerificationEmail(verificationCode, auth.getEmail());
			authToSave.setActivationCode(verificationCode);
			authRepository.save(authToSave);
			return new Response(201,"User successfully registerd. Please check Email");
		}
		
	}
	
	public Object signin(Auth auth) {
		List<com.tools.model.Auth> authList = authRepository.findByEmail(auth.getEmail());
		System.out.println("SSSS" + auth.getEmail() + authList.size());
		if(authList.size() > 0) {
			com.tools.model.Auth authCred = authList.get(0);
			System.out.println(authCred.getStatus());
			if(authCred.getStatus().equalsIgnoreCase("ACTIVE")) {
				if(passwordGenerator.matchPassword(authCred.getPassword(), auth.getPassword())) {
					return new Response(200 , "Successfully loggedIn");
				} else {
					 return new Response(400, "Incorrect password");
				}
			}else return new Response(400, "Account not activated");
		}else {
			return new Response(404 , "Email/Password Incorrect");
		}
	}

	public Object activateAccount(VerifyAccount verifyAccount) throws Exception {
		List<com.tools.model.Auth> authList = authRepository.findByEmailAndStatus(verifyAccount.getEmail(),"INACTIVE");
		if(authList.size() > 0) {
			com.tools.model.Auth auth = authList.get(0);
			if(auth.getActivationCode().equals(verifyAccount.getactivationCode())) {
				//activate account
				auth.setStatus("ACTIVE");
				authRepository.save(auth);
				emailService.sendActivationSuccessfulEmail(auth.getUsername(), auth.getEmail());
				return new Response(200, "Account activated Succesfully");
			}
			return new Response(400,"Incorrect activation code provided") ; 
		}else return new Response(404,"No user found with the account/ Account is already activated");
		
	}
	
	public String getVerificationCode() {
		Random rand = new Random();
		int  n = rand.nextInt(899999) + 100000;
		return ""+n;
	}
		
}
