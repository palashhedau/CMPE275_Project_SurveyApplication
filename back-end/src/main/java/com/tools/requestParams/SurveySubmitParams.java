package com.tools.requestParams;

import java.util.List;

public class SurveySubmitParams {
	
	List<SubmitSurveyQueList> questionList ;
	String status;
	
	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<SubmitSurveyQueList> getQuestionList() {
		return questionList;
	}

	public void setQuestionList(List<SubmitSurveyQueList> questionList) {
		this.questionList = questionList;
	} 

}
