package com.tools.requestParams;

import java.util.List;

public class EditSurveyQuestionParams {
	int id;
	String question;
	String questionType;
	List<EditSurveyChoiceParams> choice;
	int sequence ;
	
	
	
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getQuestionType() {
		return questionType;
	}
	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}
	public List<EditSurveyChoiceParams> getChoice() {
		return choice;
	}
	public void setChoice(List<EditSurveyChoiceParams> choice) {
		this.choice = choice;
	}
	
	
	
	
}
