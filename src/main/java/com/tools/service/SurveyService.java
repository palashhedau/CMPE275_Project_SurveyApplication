package com.tools.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tools.model.Choice;
import com.tools.model.Questions;
import com.tools.model.Survey;
import com.tools.repository.SurveyRepository;
import com.tools.requestParams.QuestionsAndAnswers;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.responseParam.Response;

@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class SurveyService {
	
	@Autowired
	private SurveyRepository surveyRepository;
	
	
	

	public void createSurvey(SurveySubmitParams params) {
		
		Survey survey = new Survey("Palash" , params.getPublish() , null , params.getType(), params.getStatus(), params.getCategory());
		
		for(QuestionsAndAnswers que : params.getQuestionList()) {
			
			Questions question = new Questions(que.getQuestion());
			question.setSurvey(survey);
			question.setQuestionType(que.getQuestionType());
			
			for(String ans : que.getChoice()) {
				
				Choice answer =  new Choice(ans); 
				answer.setQuestions(question);
				
				Set<Choice> choice = question.getChoice(); 
				choice.add(answer);
				question.setChoice(choice);
			
			}
			
			Set<Questions> questions = survey.getQuestions(); 
			questions.add(question);
			survey.setQuestions( questions);
			
		}
		
		Survey savedSurvey = surveyRepository.save(survey);
		
		
	}




	public Object editSurvey(String datetime, String id) {
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			//Object for editing and save
			//check survey ended or not before editing
			//survey.setEndTime(datetime);
			//surveyRepository.save(survey);
			
			return null;
		}else {
			return new Response(404,"No Survey exist by this id");
		}
	}




	public Object closeSurvey(String id) {
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			//Closing and save
			//check survey end time and only allow close when it is null and also check status = open
			//
			//surveyRepository.save(survey);
			
			return null;
		}else {
			return new Response(404,"No Survey exist by this id");
		}
		
	}

	
}
