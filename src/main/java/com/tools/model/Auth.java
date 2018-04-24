package com.tools.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Auth")
public class Auth {
	@Id
	@GeneratedValue
	int id;
	
	@Column(nullable=false,unique=true)
	String email; 
	
	String password ;
	
	String type;
	
	String status ; 
	
	
	
	
	public Auth(String username, String password, String type, String status) {
		super();
		this.email = username;
		this.password = password;
		this.type = type;
		this.status = status;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return email;
	}
	public void setUsername(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
