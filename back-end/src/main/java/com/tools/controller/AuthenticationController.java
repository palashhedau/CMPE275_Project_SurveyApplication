package com.tools.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tools.helper.Helper;
import com.tools.requestParams.Auth;
import com.tools.requestParams.VerifyAccount;
import com.tools.responseParam.AuthResponse;
import com.tools.responseParam.Response;
import com.tools.service.AuthenticationService;

@RestController
@CrossOrigin(origins = "*",allowCredentials="true",maxAge=65432421)
public class AuthenticationController {
	
	@Autowired
	AuthenticationService authService;
	
	HttpHeaders headers=new HttpHeaders();
	Helper helper = new Helper() ;
	
	@RequestMapping(path="/check-session",method=RequestMethod.GET)
	public ResponseEntity<?> checkSession(HttpSession session) throws Exception{
		System.out.println(session.getAttribute("email"));
		if(session.getAttribute("email")!= null) {
			return new ResponseEntity(new AuthResponse(true, (String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			System.out.println("HIEIEIEIEIE");
			return new ResponseEntity(new AuthResponse(false, ""), HttpStatus.OK);
		}
	}
	
	@RequestMapping(path="/signup",method=RequestMethod.POST)
	public ResponseEntity<?> signup(@RequestBody Auth auth) throws Exception{
		return new ResponseEntity(authService.signup(auth), HttpStatus.OK);	
	}
	
	@RequestMapping(path="/account-verification",method=RequestMethod.POST)
	public ResponseEntity<?> accountVerification(@RequestBody VerifyAccount verifyAccount) throws Exception{
		return new ResponseEntity(authService.activateAccount(verifyAccount), HttpStatus.OK);	
	}
	
	
	@RequestMapping(path="/signin",method=RequestMethod.POST)
	public ResponseEntity<?> signin(@RequestBody Auth auth , HttpSession session){
		
		Response response = (Response) authService.signin(auth);
		if(response.getCode() == 200){
			session.setAttribute("email", auth.getEmail());
			session.setMaxInactiveInterval(362235432);
		}
		return new ResponseEntity( response , HttpStatus.OK);
	}
	
	@RequestMapping(path="/logout",method=RequestMethod.GET)
	public ResponseEntity<?> logout(HttpSession session) throws Exception{
		session.invalidate();
		return new ResponseEntity(false, HttpStatus.OK);
	}
	
	
	@RequestMapping(path="/getName",method=RequestMethod.GET)
	public ResponseEntity<?> get(){
		return new ResponseEntity("Palash", HttpStatus.OK); 
	}
	
}
