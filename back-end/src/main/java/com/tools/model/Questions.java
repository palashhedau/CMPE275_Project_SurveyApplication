package com.tools.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Questions")
public class Questions {
	@Id
    @GeneratedValue
	int id;
	
	String question ;
	
	int sequence ;
	
	String questionType ;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
	Survey survey; 
	
	Questions(){}
	
	

	



	public int getSequence() {
		return sequence;
	}




	public void setSequence(int sequence) {
		this.sequence = sequence;
	}







	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "questions")
	private Set<Choice> choice = new HashSet<>();
	
	
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "questions")
	private Set<Survey_Submit_Response_Answers> surveySubmitResponseAnswers = new HashSet<>();
	
	
	
	
	




	
	public Set<Survey_Submit_Response_Answers> getSurveySubmitResponseAnswers() {
		return surveySubmitResponseAnswers;
	}




	public void setSurveySubmitResponseAnswers(Set<Survey_Submit_Response_Answers> surveySubmitResponseAnswers) {
		this.surveySubmitResponseAnswers = surveySubmitResponseAnswers;
	}




	public String getQuestionType() {
		return questionType;
	}




	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}




	public Questions(String question) {
		super();
		this.question = question;
	}
	
	


	public Set<Choice> getChoice() {
		return choice;
	}




	public void setChoice(Set<Choice> choice) {
		this.choice = choice;
	}




	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getQuestion() {
		return question;
	}


	public void setQuestion(String question) {
		this.question = question;
	}

	
	@JsonIgnore
	public Survey getSurvey() {
		return survey;
	}


	public void setSurvey(Survey survey) {
		this.survey = survey;
	}


	
	
	
}
