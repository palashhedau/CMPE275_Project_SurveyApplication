package com.tools.responseParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class QuestionStats {
	String question;
	
    List<Distribution> distribution = new ArrayList<>();

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