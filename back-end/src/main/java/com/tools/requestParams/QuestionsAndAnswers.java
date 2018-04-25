package com.tools.requestParams;

import java.util.List;

public class QuestionsAndAnswers {
	String question ;
	String questionType ; 
	List<String> choice ;
	
	
	public String getQuestionType() {
		return questionType;
	}
	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public List<String> getChoice() {
		return choice;
	}
	public void setChoice(List<String> choice) {
		this.choice = choice;
	}
	
}
