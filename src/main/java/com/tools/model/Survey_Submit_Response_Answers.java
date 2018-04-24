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

@Entity
@Table(name="Survey_Submit_Response_Answers")
public class Survey_Submit_Response_Answers {
	@Id
	@GeneratedValue
	int id;
	
	

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_submit_response_id", nullable = false)
	Survey_Submit_Response survey_submit_response;
	
	String answer ;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Survey_Submit_Response getSurvey_submit_response() {
		return survey_submit_response;
	}

	public void setSurvey_submit_response(Survey_Submit_Response survey_submit_response) {
		this.survey_submit_response = survey_submit_response;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	} 
	
	
	

	
	
	
	
	
}
