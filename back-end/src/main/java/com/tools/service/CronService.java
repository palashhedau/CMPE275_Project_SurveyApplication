package com.tools.service;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tools.model.Survey;
import com.tools.repository.AuthRepository;
import com.tools.repository.SurveyRepository;

@Service
public class CronService {

	
	@Autowired
	private SurveyRepository surveyRepository;
	
    @Scheduled(fixedRate = 5000)
    public void closeExpiredSurveys() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");  
    		Date date = new Date();   
    		formatter.format(date);
    		List<Survey> closed = surveyRepository.findExpriredSurveys(date);
    		for(int i=0; i < closed.size(); i++) {
    			closed.get(i).setStatus("closed");
    			surveyRepository.save(closed.get(i));
    		}
    }
	
}
