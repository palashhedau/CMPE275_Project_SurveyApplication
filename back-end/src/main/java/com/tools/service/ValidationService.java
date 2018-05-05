package com.tools.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.tools.helper.Helper;
import com.tools.repository.AuthRepository;
import com.tools.requestParams.Auth;
import com.tools.responseParam.Response;


@Service
public class ValidationService {
	
	
	@Autowired
	private AuthRepository authRepository;
	
	public Response signup(Auth auth) {
		System.out.println(authRepository);
		boolean emailValid = isValidEmailAddress(auth.getEmail());
		boolean emailExists = doesEmailAlreadyExist(auth.getEmail());
		boolean passwordValid = passwordValidation(auth.getPassword());
		boolean typeValid = validateType(auth.getType());
		if(!emailValid) {
			return new Response(400,"Email format is invalid");
		}
		if(emailExists) {
			return new Response(400,"Email already exists");
		}
		if(!passwordValid) {
			return new Response(400,"Password must be a minimum of 6 characters");	
		}
		if(!typeValid) {
			return new Response(400,"Incorrect type provided");	
		} 
		return new Response(200,"Status ok");	
	}
	
	
	public boolean isValidEmailAddress(String email) {
        String ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(ePattern);
        java.util.regex.Matcher m = p.matcher(email);
        return m.matches();
	}
	 
	public boolean doesEmailAlreadyExist(String email) {
		//authRepository.findByEmail(email);
		return false;
	}
	
	public boolean passwordValidation(String password) {
		return (password.length() >= 6);
	}
	
	public boolean validateType(String type) {
		return (type == "surveyor" || type == "surveyee");
	}

}
