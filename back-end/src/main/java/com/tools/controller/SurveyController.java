package com.tools.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tools.helper.Helper;
import com.tools.requestParams.SurveyCreateParams;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.service.SurveyService;

@RestController
@CrossOrigin(origins = "*",allowCredentials="true",maxAge=65432421)
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
	Helper helper = new Helper();
	Helper helper2 = new Helper();
	HttpHeaders headers=new HttpHeaders();
	
	@RequestMapping(path="/create-survey",method=RequestMethod.POST)
	public ResponseEntity<?> createSurvey(@RequestBody SurveyCreateParams params){
		return new ResponseEntity( surveyService.createSurvey(params) , HttpStatus.OK);
	}
	
	@RequestMapping(path="/survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> editSurvey(@RequestBody String datetime, @PathVariable String id ){
		surveyService.editSurvey(datetime, id);
		return null; 
	}
	
	@RequestMapping(path="/survey",method=RequestMethod.GET)
	public ResponseEntity<?> getSurvey(HttpSession session){
		System.out.println("Session " + session.getAttribute("email"));
		if(session.getAttribute("email")!= null) {
			return new ResponseEntity( surveyService.getSurvey(), HttpStatus.OK);
		}else {
			System.out.println(session);
			return new ResponseEntity( null, HttpStatus.UNAUTHORIZED);
		}
		
		
	}
	
	@RequestMapping(path="/survey/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> closeSurvey(@PathVariable String id ){
		surveyService.closeSurvey(id);
		return null; 
	}
	
	@RequestMapping(path="/submit-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> submitSurvey(@RequestBody SurveySubmitParams params, @PathVariable String id ){
		return new ResponseEntity( surveyService.submitSurvey(id, params), HttpStatus.OK);
	}
	
	@RequestMapping(path="/get-survey/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> getSurvey(@PathVariable String id ){
		return new ResponseEntity(surveyService.getSurveyById(id), HttpStatus.OK);
	}
	
	
}
