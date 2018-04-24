package com.tools.requestParams;

import java.util.Date;
import java.util.List;

public class SurveySubmitParams {
	String type ;
	Date endTime;
	List<QuestionsAndAnswers> questionList ; 
	String publish ;
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public List<QuestionsAndAnswers> getQuestionList() {
		return questionList;
	}
	public void setQuestionList(List<QuestionsAndAnswers> questionList) {
		this.questionList = questionList;
	}
	public String getPublish() {
		return publish;
	}
	public void setPublish(String publish) {
		this.publish = publish;
	}

}
