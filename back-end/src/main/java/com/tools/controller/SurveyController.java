package com.tools.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.tools.helper.Helper;
import com.tools.requestParams.EditSurveyParams;
import com.tools.requestParams.ExtendEndDateTime;
import com.tools.requestParams.InviteSurveyParams;
import com.tools.requestParams.SurveyCreateParams;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.responseParam.Response;
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
	public ResponseEntity<?> createSurvey(@RequestBody SurveyCreateParams params, HttpSession session){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity( surveyService.createSurvey(params,(String)session.getAttribute("email")) , HttpStatus.OK);
		}
		return new ResponseEntity( new Response(400,"Not Authorized to create the survey.") , HttpStatus.UNAUTHORIZED);
		
	}
	
	
	
	
	/* Not Sure if this method is required */
	@RequestMapping(path="/survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> editSurvey(@RequestBody String datetime, @PathVariable String id ){
		surveyService.editSurvey(datetime, id);
		return null; 
	}
	/* Not Sure if this method is required */
	
	
	
	
	@RequestMapping(path="/survey",method=RequestMethod.GET)
	public ResponseEntity<?> getSurvey(HttpSession session){
		System.out.println(session.getAttribute("email"));
		if(session.getAttribute("email")!= null) {
			return new ResponseEntity( surveyService.getSurvey((String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			System.out.println(session);
			return new ResponseEntity( null, HttpStatus.UNAUTHORIZED);
		}
		
		
	}
	
	@RequestMapping(path="/delete-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> closeSurvey(@PathVariable String id, HttpSession session ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.closeSurvey(id, (String)session.getAttribute("email") ), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to close the survey"), HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	@RequestMapping(path="/submit-survey/{id}/{code}",method=RequestMethod.POST)
	public ResponseEntity<?> submitSurvey(@RequestBody SurveySubmitParams params, 
			@PathVariable String id,
			@PathVariable String code,
			HttpSession session  ){
		
		if(session.getAttribute("email") != null){
			return new ResponseEntity( surveyService.submitSurvey(id,code,(String)session.getAttribute("email"), params), HttpStatus.OK);
		}
		else if(params.getEmail()!=null){
			return new ResponseEntity( surveyService.submitSurvey(id,code,params.getEmail(), params), HttpStatus.OK);
		}
		return new ResponseEntity( surveyService.submitSurvey(id,code,"", params), HttpStatus.OK);
		
	}
	
	@RequestMapping(value= { "/get-survey/{id}/{code}", "/get-survey/{id}/{code}/{email}"},
			method=RequestMethod.GET)
	public ResponseEntity<?> getSurveyById(@PathVariable String id, 
			@PathVariable int code,
			@PathVariable Optional<String> email, HttpSession session){
		
		String emailCaptured = "";
		
		if(session.getAttribute("email")!= null) {
			//session  wala hai
			emailCaptured = (String)session.getAttribute("email");
		}else if(email.isPresent()) {
			// without signed in user hai 

			emailCaptured = email.get();
		}
		System.out.println("cddddd " + emailCaptured);

		return new ResponseEntity(surveyService.getSurveyById(id, code, emailCaptured), HttpStatus.OK);
	}
	
	@RequestMapping(path="/view-survey/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> viewSurveyById(@PathVariable String id, HttpSession session ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.viewSurveyById(id,(String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to view the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(path="/unpublish-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> unPublishSurvey(@PathVariable String id, HttpSession session ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.unPublishSurveyById(id,(String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to Unpublish the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	

	@RequestMapping(path="/publish-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> publishSurvey(@PathVariable String id, HttpSession session ){
		
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.publishSurveyById(id,(String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to Publish the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(path="/get-survey-to-edit/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> getSurveyToEditById(@PathVariable String id, HttpSession session ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.getSurveyToEditById(id,(String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	


	
	@RequestMapping(path="/invite/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> inviteToSurvey(@PathVariable String id, 
			@RequestBody InviteSurveyParams params, 
			HttpSession session ){
		
		if(session.getAttribute("email") != null) {
			
			if(params.getEmail() != null && !params.getEmail().equalsIgnoreCase("")) {
				return new ResponseEntity(surveyService.inviteToSurvey(id , params.getEmail(),params.getType(), (String) session.getAttribute("email")), HttpStatus.OK);
			}else {
				return new ResponseEntity(new Response(400,"Please provide email"), HttpStatus.OK);
			}
		}else return new ResponseEntity(new Response(400,"You are not Authorized to invite"), HttpStatus.OK);
		

	}
	

	@RequestMapping(path="/edit-survey/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> editById(@PathVariable String id, HttpSession session, @RequestBody EditSurveyParams params ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.editSurveyById(params, id,(String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(path="/get-attempted-survey",method=RequestMethod.GET)
	public ResponseEntity<?> getSurveyByEmail( HttpSession session ){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.getAttemptedSurveys((String)session.getAttribute("email")), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@RequestMapping(path="/view-my-response/{id}/{infoId}",method=RequestMethod.GET)
	public ResponseEntity<?> viewMyResponse( HttpSession session, @PathVariable("id") String id,
			@PathVariable("infoId") String infoId){
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.viewMyResponse((String)session.getAttribute("email"), id, infoId), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to view the response"), HttpStatus.UNAUTHORIZED);
		}
	}

	@RequestMapping(path="/survey-stats/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> getSurveyDetails(@PathVariable int id, HttpSession session) throws IOException {
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.getSurveryStats(id), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}
	}

	
	ServletContext servletContext;
	@RequestMapping(path="/survey-stats/{id}/download", method=RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public void downloadSurveyDetails(@PathVariable int id,  @RequestParam(value="file", required=false, defaultValue = "download") String file , HttpSession session, HttpServletResponse response) throws IOException {
		String path = "src/public/stats/";
		if(session.getAttribute("email") != null) {
			path += file + ".json";
		    BufferedWriter writer = null;
		    try {
		    	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    	String json = ow.writeValueAsString(surveyService.getSurveryStats(id));
		        writer = new BufferedWriter(new FileWriter(path));
		        writer.write(json);
		    } catch (IOException e) {
		        System.err.println(e);
		    } finally {
		        if (writer != null) {
		            try {
		                writer.close();
		            } catch (IOException e) {
		                System.err.println(e);
		            }
		        }
		    }
		}
	    File initialFile = new File(path);
	    InputStream in = new FileInputStream(initialFile);
		response.addHeader("Content-disposition", "attachment;filename="+file+".json");
		IOUtils.copy(in, response.getOutputStream());
		response.flushBuffer();
	}
	
	@RequestMapping(path="/question-stats/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> getQuestionDetails(@PathVariable int id,  HttpSession session ) {
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.getQuestionStats(id), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}	
	}
	
	
	
	@RequestMapping(path="/extend-enddate/{id}", method=RequestMethod.POST)
	public ResponseEntity<?> extendEndDate(@PathVariable int id,
			@RequestBody ExtendEndDateTime obj,
			HttpSession session ) {
		if(session.getAttribute("email") != null) {
			return new ResponseEntity(surveyService.extendEndDate(id, obj), HttpStatus.OK);
		}else {
			return new ResponseEntity(new Response(404, "Not Authorized to get the survey"), HttpStatus.UNAUTHORIZED);
		}	
	}
	
	
}
