package com.tools.responseParam;

public class ResponseWithId {
	int code ;
	String message ;
	int id;
	
	public ResponseWithId(int code, String message, int id) {
		super();
		this.code = code;
		this.message = message;
		this.id = id;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	} 
	
	
	
}
