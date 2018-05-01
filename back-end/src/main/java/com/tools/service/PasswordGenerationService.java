package com.tools.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerationService {
	
	public String getPassword(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		return hashedPassword;
	}
	
	public boolean matchPassword(String hashedPassword, String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean matched = passwordEncoder.matches(password, hashedPassword);
		return matched;
	}

}
