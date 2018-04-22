package com.tools.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.tools.model.Flight;
import com.tools.model.Passenger;
import com.tools.model.Reservation;
import com.tools.repository.FlightRepository;
import com.tools.repository.PassengerRepository;
import com.tools.repository.ReservationRepository;

@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class PassengerService {
	
	@Autowired
	private PassengerRepository passengerRepository;
	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private FlightRepository flightRepository;
	
	public void add(){}
	
	public void update(){}
	

	public void delete(){}
	
	public void get() {}

	
}
