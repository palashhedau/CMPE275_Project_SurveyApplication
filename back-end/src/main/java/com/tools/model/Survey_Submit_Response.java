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
@Table(name="Survey_Submit_Response")
public class Survey_Submit_Response {
	@Id
	@GeneratedValue
	int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_submit_id", nullable = false)
	Survey_Submit_Info survey_submit_info;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
	Questions questions;
	
	
	public Set<Survey_Submit_Response_Answers> getSubmittedSurveyResponseAnswer() {
		return submittedSurveyResponseAnswer;
	}

	public void setSubmittedSurveyResponseAnswer(Set<Survey_Submit_Response_Answers> submittedSurveyResponseAnswer) {
		this.submittedSurveyResponseAnswer = submittedSurveyResponseAnswer;
	}

	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey_submit_response")
	private Set<Survey_Submit_Response_Answers> submittedSurveyResponseAnswer = new HashSet<>();
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Survey_Submit_Info getSurvey_submit_info() {
		return survey_submit_info;
	}

	public void setSurvey_submit_info(Survey_Submit_Info survey_submit_info) {
		this.survey_submit_info = survey_submit_info;
	}

	public Questions getQuestions() {
		return questions;
	}

	public void setQuestions(Questions questions) {
		this.questions = questions;
	}

	
	
	
	
}
