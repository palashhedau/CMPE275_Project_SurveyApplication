package com.tools.controller;

import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.tools.helper.Helper;
import com.tools.model.Flight;
import com.tools.repository.FlightRepository;
import com.tools.service.FlightService;

@RestController
public class FlightController {
	
	@Autowired
	FlightService flightService;
	
	HttpHeaders headers=new HttpHeaders();
	Helper helper = new Helper() ;
	
	@RequestMapping(path="/flight/{flightNumber}",method=RequestMethod.POST)
	public ResponseEntity<?> add(@PathVariable("flightNumber") String flightNumber ){
		flightService.add();
		System.out.println("Palash here");
		return null ; 
	}
	
	
	@RequestMapping(path="/flight/{flightNumber}",method=RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("flightNumber") String flightNumber){
		flightService.update();
		return null; 
	}
	
	
	@RequestMapping(path="/flight/{number}",method=RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("number") String flightNumber ){
		flightService.delete();
		return null ; 
	}
	
	
	
	@RequestMapping(path="/flight/{flightNumber}",method=RequestMethod.GET)
	public ResponseEntity<?> get(@PathVariable("flightNumber") String flightNumber ){
		flightService.get() ;
		return null ; 
	}
}
