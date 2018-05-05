package com.tools.requestParams;

import java.util.Date;
import java.util.List;

public class SurveyCreateParams {
	String type ;
	String endTime;
	List<QuestionsAndAnswers> questionList ; 
	boolean publish ;
	String status ;
	String category; 
	String name ;
	int id;
	
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
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
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
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
