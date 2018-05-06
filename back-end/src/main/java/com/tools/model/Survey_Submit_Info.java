package com.tools.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Survey_Submit_Info")
public class Survey_Submit_Info {
	@Id
	@GeneratedValue
	int id;
	
	String userEmail ;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
	Survey survey;

	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey_submit_info")
	private Set<Survey_Submit_Response> submittedSurveyResponse = new HashSet<>();

	public Set<Survey_Submit_Response> getSubmittedSurveyResponse() {
		return submittedSurveyResponse;
	}


	public void setSubmittedSurveyResponse(Set<Survey_Submit_Response> submittedSurveyResponse) {
		this.submittedSurveyResponse = submittedSurveyResponse;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
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
