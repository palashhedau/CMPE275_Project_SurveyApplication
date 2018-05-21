package com.tools.responseParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class QuestionStats {
	String question;
	String questionType ;
    List<Distribution> distribution = new ArrayList<>();
    int id; 
    
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	List<String> textAnswers = new ArrayList<>();

	public List<String> getTextAnswers() {
		return textAnswers;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public void setTextAnswers(List<String> textAnswers) {
		this.textAnswers = textAnswers;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Distribution> getDistribution() {
		return distribution;
	}

	public void setDistribution(List<Distribution> distribution) {
		this.distribution = distribution;
	}



}
