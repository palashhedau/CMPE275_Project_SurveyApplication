package com.tools.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Choice")
public class Choice {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	int id;
	
	String answers ;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
	Questions questions; 
	

	public Choice(String answers) {
		super();
		this.answers = answers;
	}

	
	public Questions getQuestions() {
		return questions;
	}


	public void setQuestions(Questions questions) {
		this.questions = questions;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAnswers() {
		return answers;
	}

	public void setAnswers(String answers) {
		this.answers = answers;
	}

	
}
