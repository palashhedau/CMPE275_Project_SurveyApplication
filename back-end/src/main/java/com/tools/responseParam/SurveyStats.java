package com.tools.responseParam;

import java.util.Date;

public class SurveyStats {
	int participants;
	Date startTime;
	Date endTime;
	float participationRate;

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
	public float getParticipationRate() {
		return participationRate;
	}
	public void setParticipationRate(float participationRate) {
		this.participationRate = participationRate;
	}
}
