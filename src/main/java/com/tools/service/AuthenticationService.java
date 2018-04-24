package com.tools.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tools.helper.Helper;
import com.tools.repository.AuthRepository;
import com.tools.repository.FlightRepository;
import com.tools.repository.PlaneRepository;
import com.tools.repository.ReservationRepository;
import com.tools.requestParams.Auth;
import com.tools.responseParam.Response;


@Service
public class AuthenticationService {
	
	
	@Autowired
	private AuthRepository authRepository;
	
	
	public Object signup(Auth auth){
		
		if(authRepository.findByEmail(auth.getEmail()).size() > 0 ) {
			return new Response(400,"Email already exist");
		}else {
			com.tools.model.Auth authToSave = new com.tools.model.Auth(auth.getEmail(), auth.getPassword(),
					"TYPE1" , "NO"); 
			authRepository.save(authToSave);
			// Send an email to the user
			return new Response(201,"User successfully registerd. Please check Email");
		}
		
	}
	
	public Object signin(Auth auth){
		List<com.tools.model.Auth> authList = authRepository.findByEmail(auth.getEmail());
		if(authList.size() > 0) {
			//compare password
			return new Response(202 , "Successfully loggedIn");
		}else {
			return new Response(404 , "Email/Password Incorrect");
		}
	}
	
	
	
	
	
}
