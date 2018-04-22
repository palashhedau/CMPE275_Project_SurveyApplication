package com.tools.service;

import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tools.helper.Helper;
import com.tools.model.Flight;
import com.tools.model.Passenger;
import com.tools.model.Plane;
import com.tools.model.Reservation;
import com.tools.repository.FlightRepository;
import com.tools.repository.PlaneRepository;
import com.tools.repository.ReservationRepository;

@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class FlightService {
	
	Helper helper = new Helper();
	
	@Autowired
	private PlaneRepository planeRepository;
	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private FlightRepository flightRepository;
	
	
	public void add(){}
	
	public void update(){}
	
	public void delete() {}
	
	public  void get() {}
	
	
	
}
