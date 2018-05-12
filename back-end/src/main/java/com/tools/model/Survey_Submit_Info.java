package com.tools.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="Survey_Submit_Info")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Survey_Submit_Info {
	@Id
	@GeneratedValue
	int id;
	
	String userEmail ;
	
	String status;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
	Survey survey;

	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "surveyInfo")
	private Set<Survey_Submit_Response_Answers> answerList = new HashSet<>();


	

	

	public Set<Survey_Submit_Response_Answers> getAnswerList() {
		return answerList;
	}


	public void setAnswerList(Set<Survey_Submit_Response_Answers> answerList) {
		this.answerList = answerList;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}
	

	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}


	@JsonIgnore
	public Survey getSurvey() {
		return survey;
	}


	public void setSurvey(Survey survey) {
		this.survey = survey;
	} 
		
}
