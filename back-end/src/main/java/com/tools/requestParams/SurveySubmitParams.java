package com.tools.requestParams;

import java.util.List;

public class SurveySubmitParams {
	
	List<SubmitSurveyQueList> questionList ;

	public List<SubmitSurveyQueList> getQuestionList() {
		return questionList;
	}

	public void setQuestionList(List<SubmitSurveyQueList> questionList) {
		this.questionList = questionList;
	} 

}
