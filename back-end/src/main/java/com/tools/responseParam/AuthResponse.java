package com.tools.responseParam;

public class AuthResponse {
	boolean auth;
	String email;
	
	public AuthResponse(boolean auth, String email) {
		super();
		this.auth = auth;
		this.email = email;
	}

	public boolean isAuth() {
		return auth;
	}

	public void setAuth(boolean auth) {
		this.auth = auth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
	
}
