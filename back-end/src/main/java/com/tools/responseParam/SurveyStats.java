package com.tools.responseParam;

import java.util.Date;
import java.util.HashMap;

public class SurveyStats {
	int participants;
	Date startTime;
	Date endTime;
	int  submissions;
	int invited;
	int registeredSurvyees ;
	int guestSurveyees;
    HashMap<String, QuestionStats> questions = new HashMap<String, QuestionStats>();
    
	public HashMap<String, QuestionStats> getQuestions() {
		return questions;
	}
	public void setQuestions(HashMap<String, QuestionStats> hmap) {
		this.questions = hmap;
	}
	public int getGuestSurveyees() {
		return guestSurveyees;
	}
	public void setGuestSurveyees(int guestSurveyees) {
		this.guestSurveyees = guestSurveyees;
	}
	public int getParticipants() {
		return participants;
	}
	public void setParticipants(int participants) {
		this.participants = participants;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public int getSubmissions() {
		return submissions;
	}
	public void setSubmissions(int submissions) {
		this.submissions = submissions;
	}
	public int getInvited() {
		return invited;
	}
	public void setInvited(int invited) {
		this.invited = invited;
	}
	public int getRegisteredSurvyees() {
		return registeredSurvyees;
	}
	public void setRegisteredSurvyees(int registeredSurvyees) {
		this.registeredSurvyees = registeredSurvyees;
	}
}
