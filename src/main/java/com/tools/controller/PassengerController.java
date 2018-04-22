package com.tools.controller;

import java.io.IOException;
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
import com.tools.model.Flight;
import com.tools.model.Passenger;
import com.tools.model.Plane;
import com.tools.model.Reservation;
import com.tools.service.PassengerService;

@RestController
public class PassengerController {
	
	@Autowired
	PassengerService passengerService;
	
	Helper helper = new Helper();
	HttpHeaders headers=new HttpHeaders();
	
	@RequestMapping(path="/passenger",method=RequestMethod.POST)
	public ResponseEntity<?> add(){
		passengerService.add();
		return null; 
	}
	
	@RequestMapping(path="/passenger/{id}",method=RequestMethod.PUT)
	public ResponseEntity<?> update()
	{
		passengerService.update();
		return null; 
	}
	
	
	@RequestMapping(path="/passenger/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") String id)
	{
		passengerService.delete();
		return null;
	}
	
	
	@RequestMapping(path="/passenger/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> get(@PathVariable("id") String id,@RequestParam(value="xml", required=false) boolean xml) 
	{
		passengerService.get() ; 
		return null ; 
	}
}
