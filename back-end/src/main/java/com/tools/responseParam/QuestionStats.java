package com.tools.responseParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class QuestionStats {
	String question;
	
    List<Distribution> distribution = new ArrayList<>();

    List<String> textAnswers = new ArrayList<>();

	public List<String> getTextAnswers() {
		return textAnswers;
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
