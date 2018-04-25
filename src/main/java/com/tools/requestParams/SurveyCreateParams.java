package com.tools.requestParams;

import java.util.Date;
import java.util.List;

public class SurveyCreateParams {
	String type ;
	Date endTime;
	List<QuestionsAndAnswers> questionList ; 
	boolean publish ;
	String status ;
	String category; 
	
	
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
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
	public boolean getPublish() {
		return publish;
	}
	public void setPublish(boolean publish) {
		this.publish = publish;
	}

}
