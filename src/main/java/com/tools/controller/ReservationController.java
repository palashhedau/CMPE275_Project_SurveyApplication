package com.tools.controller;

import java.util.HashMap;
import java.util.List;

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
import com.tools.model.Reservation;
import com.tools.service.ReservationService;



@RestController
public class ReservationController {
	
	@Autowired
	ReservationService reservationService;
	
	Helper helper = new Helper() ;
	HttpHeaders headers=new HttpHeaders();
	
	@RequestMapping(path="/reservation",method=RequestMethod.POST)
	public ResponseEntity<?> add(@RequestParam("passengerId") String passengerId ,
			@RequestParam("flightLists") String flightLists){
		
		reservationService.add();
		return null ;
		
	}
	

	@RequestMapping(path="/reservation/{number}",method=RequestMethod.PUT)
	public ResponseEntity<?> update(){
		reservationService.update() ; 
		return null; 
	}
	
	
	@RequestMapping(path="/reservation/{number}",method=RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("number") String number){
		reservationService.delete();
		return null;
	}
	
	
	@RequestMapping(path="/reservation",method=RequestMethod.GET)
	public ResponseEntity<?> search(){
		reservationService.get();
		return null ; 
	}
	
	
	@RequestMapping(path="/reservation/{number}",method=RequestMethod.GET)
	public ResponseEntity<?> get(@PathVariable("number") String number){
		reservationService.getByNumber(number);
		return null ;
	}
	
	
	
}
