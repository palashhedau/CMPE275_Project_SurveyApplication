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
@Table(name="Survey_Submit_Response_Answers")
public class Survey_Submit_Response_Answers {
	@Id
	@GeneratedValue
	int id;
	
	

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "questions_id", nullable = false)
	Questions questions;
	
	String answer ;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	/*@JsonIgnore
	public Survey_Submit_Response getSurvey_submit_response() {
		return survey_submit_response;
	}

	public void setSurvey_submit_response(Survey_Submit_Response survey_submit_response) {
		this.survey_submit_response = survey_submit_response;
	}*/

	@JsonIgnore
	public Questions getQuestions() {
		return questions;
	}

	public void setQuestions(Questions questions) {
		this.questions = questions;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	} 
	
	
	

	
	
	
	
	
}
