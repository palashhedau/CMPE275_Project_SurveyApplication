package com.tools.requestParams;

import java.util.List;



public class SubmitSurveyQueList {
	int questionId;
	List<String> choice ;
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public List<String> getChoice() {
		return choice;
	}
	public void setChoice(List<String> answer) {
		this.choice = answer;
	}
	
}
