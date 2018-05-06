package com.tools.requestParams;

import java.util.List;

public class EditSurveyParams {
	public String category ;
	public int id;
	public String creator;
	public String endTime ;
	public String name;
	public boolean publish ;
    List<EditSurveyQuestionParams> questions ; 
    public String status;
    
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isPublish() {
		return publish;
	}
	public void setPublish(boolean publish) {
		this.publish = publish;
	}
	public List<EditSurveyQuestionParams> getQuestions() {
		return questions;
	}
	public void setQuestions(List<EditSurveyQuestionParams> questions) {
		this.questions = questions;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
    
}
