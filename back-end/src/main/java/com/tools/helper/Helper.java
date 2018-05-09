package com.tools.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

//import org.hibernate.collection.internal.PersistentBag;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thoughtworks.xstream.XStream;


public class Helper {
	
	public ErrorRequest getErrorReponse(int code , String msg) {
		ErrorRequest errorResponse = new ErrorRequest();
		errorResponse.setCode(code);
		errorResponse.setMessage(msg);
		return errorResponse;
	}
	
	public Date parseDate(String date) {
		try{
			System.out.println("Date hai re ye " + date );
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
			sdf.setTimeZone(TimeZone.getTimeZone("PST"));
			return sdf.parse(date);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null ;
		
	}
	
	
	public boolean compareDate(Date date1 , Date date2) {
		if(date1.compareTo(date2) <= 0 ) return true ;
		return false ; 
	}
	
	public XStream objectToXML() {
		XStream xstream = new XStream();
		//xstream.alias("Response", SuccessRequest.class);
		//xstream.alias("passenger", Passenger.class);
		//xstream.alias("reservation", Reservation.class);
		//xstream.alias("flight", FlightResponseParameters.class);
		//xstream.alias("flight", Flight.class);
		//xstream.alias("Response", ErrorRequestMessage.class);
		//xstream.setMode(XStream.NO_REFERENCES);
		//xstream.addDefaultImplementation(PersistentBag.class,List.class);
		//xstream.addDefaultImplementation(PersistentBag.class,HashMap.class);
		//xstream.addDefaultImplementation(PersistentBag.class,HashSet.class);
		//xstream.omitField(Passenger.class, "success");
		//xstream.omitField(Flight.class, "reservations");
		//xstream.omitField(Reservation.class, "billing");
		//xstream.omitField(Plane.class, "flight");
		//xstream.omitField(Reservation.class, "passenger");
		//xstream.registerConverter(new HibernatePersistentCollectionConverter(xstream.getMapper()));
		return xstream;
	}
	
	public String convertToJSON(Object o)
	{
		ObjectMapper mapper = new ObjectMapper();
		String jsonString="";
		try {
			jsonString = mapper.writeValueAsString(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return jsonString;
		}
	}
	
	public int codeGenerator()
	{
		int x = (int)(Math.random()*((100000000-1)+1))+1;
		System.out.println("Random numbers: "+x);
		return x;
	}
	
}
