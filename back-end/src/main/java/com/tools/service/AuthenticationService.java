package com.tools.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tools.helper.Helper;
import com.tools.repository.AuthRepository;
import com.tools.requestParams.Auth;
import com.tools.responseParam.ResponseParams;


@Service
public class AuthenticationService {
	
	
	@Autowired
	private AuthRepository authRepository;
	
	
	public Object signup(Auth auth){
		
		if(authRepository.findByEmail(auth.getEmail()).size() > 0 ) {
			return new ResponseParams(400,"Email already exist");
		}else {
			com.tools.model.Auth authToSave = new com.tools.model.Auth(auth.getEmail(), auth.getPassword(),
					"TYPE1" , "NO"); 
			//Generate code to activate account
			authToSave.setActivationCode("ABCD");
			authRepository.save(authToSave);
			// Send an email to the user and send the code in the mail
			return new ResponseParams(201,"User successfully registerd. Please check Email");
		}
		
	}
	
	public ResponseParams signin(Auth auth){
		List<com.tools.model.Auth> authList = authRepository.findByEmail(auth.getEmail());
		if(authList.size() > 0) {
			com.tools.model.Auth authCred = authList.get(0);
			if(authCred.getStatus().equalsIgnoreCase("YES")) {
				//compare password
				return new ResponseParams(202 , "Successfully loggedIn");
			}else return new ResponseParams(400, "Account not activated");
		}else {
			return new ResponseParams(404 , "Email/Password Incorrect");
		}
	}

	public Object activateAccount(String id, String code) {
		List<com.tools.model.Auth> authList = authRepository.findById(Integer.parseInt(id));
		if(authList.size() > 0) {
			com.tools.model.Auth auth = authList.get(0);
			if(auth.getActivationCode().equalsIgnoreCase(code)) {
				//activate account
				auth.setStatus("YES");
				authRepository.save(auth);
				return new ResponseParams(200, "Account activated Succesfully");
			}
			return new ResponseParams(400,"Incorrect activation code provided") ; 
		}else return new ResponseParams(404,"No user found with the account") ;
		
	}
	
	
	
	
	
}
