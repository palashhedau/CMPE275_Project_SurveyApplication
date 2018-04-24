package com.tools.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tools.helper.Helper;
import com.tools.requestParams.Auth;
import com.tools.service.AuthenticationService;

@RestController
public class AuthenticationController {
	
	@Autowired
	AuthenticationService authService;
	
	HttpHeaders headers=new HttpHeaders();
	Helper helper = new Helper() ;
	
	@RequestMapping(path="/signup",method=RequestMethod.POST)
	public ResponseEntity<?> signup(Auth auth){
		authService.signup(auth);
		return null ; 
	}
	
	
	@RequestMapping(path="/signin",method=RequestMethod.PUT)
	public ResponseEntity<?> signin(Auth auth){
		
		return null; 
	}
	
	
	@RequestMapping(path="/getName",method=RequestMethod.GET)
	public ResponseEntity<?> get(){
		
		return new ResponseEntity("Palash", HttpStatus.OK); 
	}
	
	
}
