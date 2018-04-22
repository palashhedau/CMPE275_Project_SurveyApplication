package com.tools.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tools.helper.Helper;
import com.tools.model.Billing;
import com.tools.model.Flight;
import com.tools.model.Passenger;
import com.tools.model.Reservation;
import com.tools.repository.BillingRepository;
import com.tools.repository.FlightRepository;
import com.tools.repository.PassengerRepository;
import com.tools.repository.ReservationRepository;


@Transactional(isolation=Isolation.READ_COMMITTED, propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private BillingRepository billingRepository;
	@Autowired
	private FlightRepository flightRepository;
	@Autowired
	private PassengerRepository passengerRepository;

	Helper helper = new Helper();

	public void add() {}

	public void get() {}

	public void delete() {}

	public void update() {}

	public void getByNumber(String number) {}

}
