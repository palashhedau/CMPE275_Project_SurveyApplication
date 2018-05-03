package com.tools.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tools.helper.Helper;
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
	
	Helper helper = new Helper();
	
	public Object createSurvey(SurveyCreateParams params) {
		Survey survey = new Survey("Palash" , params.getPublish() , helper.parseDate(params.getEndTime()) , params.getType(), params.getStatus(), params.getCategory());
		
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
		survey.setName(params.getName());
		Survey savedSurvey = surveyRepository.save(survey);
		return new Response(200, "Survey saved successfully");
	
	}



	// 7.c
	public Object editSurvey(String datetime, String id) {
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			if(survey.getStatus().equalsIgnoreCase("open") && helper.compareDate(helper.parseDate(datetime), survey.getEndTime())) {
				survey.setEndTime(helper.parseDate(datetime));
				surveyRepository.save(survey);
				return new Response(200,"Successfully updated the Survey end Date");
			}
			return new Response(400,"Either Survey status is closed or increase your Survey End date");
		}else {
			return new Response(404,"No Survey exist by this id");
		}
	}




	public Object closeSurvey(String id) {
		
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			// 7.d
			if(survey.getEndTime() == null && survey.getStatus().equalsIgnoreCase("open")) {
				survey.setStatus("close");
				surveyRepository.save(survey);
				return new Response(200,"Successfully closed the survey");
			}
			return new Response(400,"Server status is already close");
		}else {
			return new Response(404,"No Survey exist by this id");
		}
		
	}



	public Object submitSurvey(String id, SurveySubmitParams params) {
		List<Survey> surveyList =  surveyRepository.findById(Integer.parseInt(id));
		if(surveyList.size() > 0) {
			Survey survey = surveyList.get(0);
			System.out.println(survey.getStatus());
			if(survey.getStatus().equalsIgnoreCase("Published") && helper.compareDate(new Date(), survey.getEndTime())) {
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
					
					for(String ans : list.getChoice()) {
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
				return new Response(200, "Survey submitted successfully");
			}else return new Response(404, "Survey Not active");
		}else return new Response(404, "Survey Not Found");
	
	}



	
	public Object getSurvey() {
		System.out.println("Getting data");
		return surveyRepository.findByAuthId(1);
	}



	public Object getSurveyById(String id) {
		//check if user eligible for taking survey
		// and only get the PUBLISHED survey
		List<Survey> surveyList = surveyRepository.findByIdAndStatus(Integer.parseInt(id), "Published");
		if(surveyList.size() == 0) {
			return new Response(404, "No such Survey Exist");
		}else {
			return surveyList;
		}
	}

	
}
