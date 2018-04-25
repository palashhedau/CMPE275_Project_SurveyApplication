package com.tools.requestParams;

import java.util.List;



public class SubmitSurveyQueList {
	int questionId;
	List<String> answer ;
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public List<String> getAnswer() {
		return answer;
	}
	public void setAnswer(List<String> answer) {
		this.answer = answer;
	}
	
}
