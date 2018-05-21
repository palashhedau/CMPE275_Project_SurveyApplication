package com.tools.model;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.OrderColumn;
import javax.persistence.Table;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="Survey")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Survey {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	int id ;
	
	String creator; 
	
	
	Date endTime ;
	
	
	
	
	String status ;
	
	String category; 
	
	String name ;
	
	String email ;
	
	Date startTime ;
	
	
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey")
	@OrderBy("sequence")
	private Set<Questions> questions = new LinkedHashSet<>();
	
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey")
	private Set<Survey_Submit_Info> submittedSurvery = new HashSet<>();
	
	/*
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
	Auth auth ; */
	
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey")
	private Set<Invites> invites = new HashSet<>();
	
	
	
	
	Survey(){}
	
	public Survey(String creator ,  Date endTime,  String status, String category) {
		super();
		this.status = status;
		this.creator = creator;
		this.endTime = endTime;
		this.category = category;
	}
	
	
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	
	/*public Auth getAuth() {
		return auth;
	}

	public void setAuth(Auth auth) {
		this.auth = auth;
	}*/

	

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	
	public Set<Invites> getInvites() {
		return invites;
	}


	public void setInvites(Set<Invites> invites) {
		this.invites = invites;
	}


	public Set<Survey_Submit_Info> getSubmittedSurvery() {
		return submittedSurvery;
	}

	
	public void setSubmittedSurvery(Set<Survey_Submit_Info> submittedSurvery) {
		this.submittedSurvery = submittedSurvery;
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

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	
	public Set<Questions> getQuestions() {
		return questions;
	}

	
	public void setQuestions(Set<Questions> questions) {
		this.questions = questions;
	} 
	
	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	
	
	
}
