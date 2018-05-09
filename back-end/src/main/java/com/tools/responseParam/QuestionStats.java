package com.tools.responseParam;

import java.util.HashMap;

public class QuestionStats {
	int  choices;
    HashMap<String, Integer> distribution = new HashMap<String, Integer>();


	public HashMap<String, Integer> getDistribution() {
		return distribution;
	}

	public void setDistribution(HashMap<String, Integer> distribution) {
		this.distribution = distribution;
	}

	public int getChoices() {
		return choices;
	}

	public void setChoices(int choices) {
		this.choices = choices;
	}
}
