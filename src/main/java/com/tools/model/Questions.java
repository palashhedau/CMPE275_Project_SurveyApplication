package com.tools.model;

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
@Table(name="Questions")
public class Questions {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	int id;
	
	String question ;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
	Survey survey; 
	
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "questions")
	private Set<Answers> answers = new HashSet<>();
	

	public Questions(String question) {
		super();
		this.question = question;
	}
	
	


	public Set<Answers> getAnswers() {
		return answers;
	}




	public void setAnswers(Set<Answers> answers) {
		this.answers = answers;
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


	public Survey getSurvey() {
		return survey;
	}


	public void setSurvey(Survey survey) {
		this.survey = survey;
	}


	
	
	
}
