package com.tools.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tools.helper.Helper;
import com.tools.requestParams.Auth;
import com.tools.responseParam.ResponseParams;
import com.tools.service.AuthenticationService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
	
	@Autowired
	AuthenticationService authService;
	
	HttpHeaders headers=new HttpHeaders();
	Helper helper = new Helper() ;
	
	@RequestMapping(path="/signup",method=RequestMethod.POST)
	public ResponseEntity<?> signup(Auth auth){
		return new ResponseEntity(authService.signup(auth), HttpStatus.NOT_FOUND);
		 
	}
	
	
	@RequestMapping(path="/signin",method=RequestMethod.POST)
	public ResponseEntity<?> signin(@RequestBody Auth auth){
		ResponseParams r = authService.signin(auth);
		return new ResponseEntity(r , HttpStatus.OK);
	}
	
	
	@RequestMapping(path="/getName",method=RequestMethod.GET)
	public ResponseEntity<?> get(){
		
		return new ResponseEntity("Palash", HttpStatus.OK); 
	}
	
	@RequestMapping(path="/activate-account/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> activateAccount(@PathVariable("id") String id , @RequestParam String code){
		authService.activateAccount(id , code);
		return new ResponseEntity("Palash", HttpStatus.OK); 
	}
	
	
	
}
