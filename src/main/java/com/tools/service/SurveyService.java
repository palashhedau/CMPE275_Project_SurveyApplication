package com.tools.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tools.model.Answers;
import com.tools.model.Questions;
import com.tools.model.Survey;
import com.tools.repository.SurveyRepository;
import com.tools.requestParams.QuestionsAndAnswers;
import com.tools.requestParams.SurveySubmitParams;

@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class SurveyService {
	
	@Autowired
	private SurveyRepository surveyRepository;
	
	
	

	public void createSurvey(SurveySubmitParams params) {
		
		Survey survey = new Survey("Palash" );
		
		for(QuestionsAndAnswers que : params.getQuestionList()) {
			
			Questions question = new Questions(que.getQuestion());
			question.setSurvey(survey);
			
			
			for(String ans : que.getAnswer()) {
				Answers answer =  new Answers(ans); 
				answer.setQuestions(question);
				
				Set<Answers> answers = question.getAnswers(); 
				answers.add(answer);
				question.setAnswers(answers);
				
			}
			
			
			Set<Questions> questions = survey.getQuestions(); 
			questions.add(question);
			survey.setQuestions( questions);
			
		}
		
		
		surveyRepository.save(survey);
		
		
		
	}

	
}
