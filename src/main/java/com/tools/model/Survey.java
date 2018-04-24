package com.tools.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Survey")
public class Survey {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	int id ;
	
	String creator; 
	
	boolean publish;
	
	Date endTime ;
	
	String type ;
	
	String status ;
	
	String category; 
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey")
	private Set<Questions> questions = new HashSet<>();
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey")
	private Set<Survey_Submit_Info> submittedSurvery = new HashSet<>();
	
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
	Auth auth; 
	

	
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Auth getAuth() {
		return auth;
	}

	public void setAuth(Auth auth) {
		this.auth = auth;
	}

	public boolean getPublish() {
		return publish;
	}

	public void setPublish(boolean publish ) {
		this.publish = publish;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	

	public Survey(String creator , boolean publish , Date endTime, String type , String status, String category) {
		super();
		this.status = status;
		this.creator = creator;
		this.publish = publish;
		this.endTime = endTime;
		this.type = type; 
		this.category = category;
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
	
	
	
	
}
