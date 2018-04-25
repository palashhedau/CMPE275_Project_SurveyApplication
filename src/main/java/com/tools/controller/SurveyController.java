package com.tools.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
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
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
	Helper helper = new Helper();
	HttpHeaders headers=new HttpHeaders();
	
	@RequestMapping(path="/survey",method=RequestMethod.POST)
	public ResponseEntity<?> createSurvey(@RequestBody SurveyCreateParams params){
		surveyService.createSurvey(params);
		return null; 
	}
	
	@RequestMapping(path="/survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> editSurvey(@RequestBody String datetime, @PathVariable String id ){
		surveyService.editSurvey(datetime, id);
		return null; 
	}
	
	@RequestMapping(path="/survey/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> closeSurvey(@PathVariable String id ){
		surveyService.closeSurvey(id);
		return null; 
	}
	
	@RequestMapping(path="/submit-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> submitSurvey(@RequestBody SurveySubmitParams params, @PathVariable String id ){
		surveyService.submitSurvey(id, params);
		return null; 
	}
	
	
}
