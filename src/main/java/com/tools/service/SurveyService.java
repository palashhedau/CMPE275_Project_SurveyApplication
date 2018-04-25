package com.tools.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tools.model.Auth;
import com.tools.model.Choice;
import com.tools.model.Questions;
import com.tools.model.Survey;
import com.tools.model.Survey_Submit_Info;
import com.tools.model.Survey_Submit_Response;
import com.tools.model.Survey_Submit_Response_Answers;
import com.tools.repository.AuthRepository;
import com.tools.repository.QuestionsRepository;
import com.tools.repository.SurveyRepository;
import com.tools.repository.SurveySubmitInfoRepository;
import com.tools.requestParams.QuestionsAndAnswers;
import com.tools.requestParams.SubmitSurveyQueList;
import com.tools.requestParams.SurveyCreateParams;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.responseParam.Response;

@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,rollbackFor=Exception.class,timeout=10)
@Service
public class SurveyService {
	
	@Autowired
	private SurveyRepository surveyRepository;
	
	@Autowired
	private AuthRepository authRepository;
	
	@Autowired
	private QuestionsRepository questionsRepository;
	
	@Autowired
	private SurveySubmitInfoRepository surveySubmitInfoRepository;
	

	public void createSurvey(SurveyCreateParams params) {
		
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
		
		
		
		List<Auth> auth = authRepository.findById(1);
		survey.setAuth(auth.get(0));
		
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



	public void submitSurvey(String id, SurveySubmitParams params) {
		
		// check survey is still open and end_date not less than current day
		Survey survey =  surveyRepository.findById(Integer.parseInt(id)).get(0);
		
		Survey_Submit_Info info = new Survey_Submit_Info();
		info.setSurvey(survey);
		info.setUserId(1);
		
		List<SubmitSurveyQueList> questionsList  = params.getQuestionList() ;
		for(SubmitSurveyQueList list : questionsList) {
			
			// find question by ID
			Questions que = questionsRepository.findById(list.getQuestionId()).get(0);
			
			Survey_Submit_Response response = new Survey_Submit_Response();
			response.setSurvey_submit_info(info);
			response.setQuestions(que);
			
			for(String ans : list.getAnswer()) {
				Survey_Submit_Response_Answers answer = new Survey_Submit_Response_Answers();
				answer.setAnswer(ans);
				answer.setSurvey_submit_response(response);
				
				Set<Survey_Submit_Response_Answers> tempResponse = response.getSubmittedSurveyResponseAnswer();
				tempResponse.add(answer);
				response.setSubmittedSurveyResponseAnswer(tempResponse);
			}
			
			Set<Survey_Submit_Response> tempSurveyResponse = info.getSubmittedSurveyResponse();
			tempSurveyResponse.add(response);
			info.setSubmittedSurveyResponse(tempSurveyResponse);
		}
		
		surveySubmitInfoRepository.save(info);
		
		
		
	}

	
}
