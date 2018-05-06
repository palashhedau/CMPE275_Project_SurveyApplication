package com.tools.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import com.tools.helper.Helper;
import com.tools.model.Auth;
import com.tools.model.Choice;
import com.tools.model.Invites;
import com.tools.model.Questions;
import com.tools.model.Survey;
import com.tools.model.Survey_Submit_Info;
import com.tools.model.Survey_Submit_Response;
import com.tools.model.Survey_Submit_Response_Answers;
import com.tools.repository.AuthRepository;
import com.tools.repository.InvitesRepository;
import com.tools.repository.QuestionsRepository;
import com.tools.repository.SurveyRepository;
import com.tools.repository.SurveySubmitInfoRepository;
import com.tools.requestParams.EditSurveyChoiceParams;
import com.tools.requestParams.EditSurveyParams;
import com.tools.requestParams.EditSurveyQuestionParams;
import com.tools.requestParams.QuestionsAndAnswers;
import com.tools.requestParams.SubmitSurveyQueList;
import com.tools.requestParams.SurveyCreateParams;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.responseParam.Response;
import com.tools.responseParam.ResponseWithId;

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
	
	@Autowired
	private InvitesRepository invitesRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	Helper helper = new Helper();
	String host="http://localhost/survey/take-survey/";
	
	public Object createSurvey(SurveyCreateParams params, String email) {
		
		System.out.println("New ID to add ? " + params.getId());
		
		Survey survey ;
		if(params.getId() != 0) {
			survey = surveyRepository.findById(params.getId()).get(0);
			survey.setQuestions(new HashSet<Questions>());
			questionsRepository.deleteBySurveyId(params.getId());
		}else {
			survey = new Survey(email , params.getPublish() , helper.parseDate(params.getEndTime()) , params.getType(), params.getStatus(), params.getCategory());
			List<Auth> auth = authRepository.findByEmail(email);
			survey.setAuth(auth.get(0));
			survey.setName(params.getName());
		}
		
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
		return new ResponseWithId(200, "Survey saved successfully", savedSurvey.getId());
	
	}

	public Object editSurveyById(EditSurveyParams params, String id, String email) {
		Survey survey ;
		survey = surveyRepository.findById(params.getId()).get(0);
		survey.setQuestions(new HashSet<Questions>());
		questionsRepository.deleteBySurveyId(params.getId());
		
		
		for(EditSurveyQuestionParams que : params.getQuestions()) {
			System.out.println("KKKKKKKKKKKKKKKKKDDDDDDDDDDDDD " + params.getQuestions().size());
			
			Questions question = new Questions(que.getQuestion());
			question.setSurvey(survey);
			question.setQuestionType(que.getQuestionType());
			
			for(EditSurveyChoiceParams ans : que.getChoice()) {
				
				Choice answer =  new Choice(ans.getAnswers()); 
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
		return new ResponseWithId(200, "Survey saved successfully", savedSurvey.getId());
		
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




	public Object closeSurvey(String id, String email) {
		System.out.println("AYAY 1");
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			System.out.println("AYAY 2");
			// 7.d
			if(survey.getEndTime() == null && 
					( ! survey.getStatus().equalsIgnoreCase("Closed"))) {
				System.out.println("AYAY 3");
				survey.setStatus("Closed");
				surveyRepository.save(survey);
				return new Response(200,"Successfully closed the survey");
			}
			return new Response(400,"Survey status is already closed/ end time is specified");
		}else {
			return new Response(404,"Not authorized to close the survey");
		}
		
	}



	public Object submitSurvey(String id,String code,String email, SurveySubmitParams params) {
		List<Survey> surveyList =  surveyRepository.findById(Integer.parseInt(id));
		if(surveyList.size() > 0) {
			Survey survey = surveyList.get(0); 
			System.out.println(survey.getStatus());
			if(survey.getStatus().equalsIgnoreCase("Published") && helper.compareDate(new Date(), survey.getEndTime())) {
				Survey_Submit_Info info = new Survey_Submit_Info();
				info.setSurvey(survey);
				info.setUserEmail(email);
				
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
				if(!survey.getCategory().equalsIgnoreCase("general"))
				{
					//Invites invites=invitesRepository.
					List<Invites> invites=invitesRepository.findByCodeAndEmail(Integer.parseInt(code),email);
					if(invites.size()>0)
					{
						Invites inv=invites.get(0);
						inv.setStatus(true);
						//inv.setCode(Integer.parseInt(code));
						invitesRepository.save(inv);
					}
				}
				return new Response(200, "Survey submitted successfully");
			}else return new Response(404, "Survey Not active");
		}else return new Response(404, "Survey Not Found");
	
	}



	
	public Object getSurvey(String email) {
		List<Auth> authList = authRepository.findByEmail(email);
		if(authList.size() > 0) {
			return surveyRepository.findByAuthId(authList.get(0).getId());
		}
		return null ; 
	}



	public Object getSurveyById(String id) {
		//check if user eligible for taking survey
		List<Survey> surveyList = surveyRepository.findByIdAndStatus(Integer.parseInt(id), "Published");
		if(surveyList.size() == 0) {
			return new Response(404, "No such Survey Exist");
		}else {
			List<Invites> invite = invitesRepository.findBySurveyAndStatus(Integer.parseInt(id),0);
			if(invite.size()>0)
			{
				return surveyList;
			}
			else
			{
				// to send message as survey already taken
				return null;
			}
		}
	}



	public Object viewSurveyById(String id, String email) {
		List<Survey> surveyList = surveyRepository.findByIdAndAuthEmail(Integer.parseInt(id), email);
		if(surveyList.size()>0) {
			return surveyList.get(0);
		}else {
			return new Response(404,"Not Authorized to view the survey");
		}
		
	}



	public Object unPublishSurveyById(String id, String attribute) {
		System.out.println("YAHA AAYA 1 ");
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			System.out.println("YAHA AAYA 2");
			// 7.b.1
			if((survey.getStatus().equalsIgnoreCase("Published"))) {
				System.out.println("YAHA AAYA 3");
				if( survey.getSubmittedSurvery().size() == 0) {
					survey.setStatus("Unpublished");
					surveyRepository.save(survey);
					System.out.println("YAHA AAYA 4");
					return new Response(200,"Successfully closed the survey");
				};
				return new  Response(400,"Cannot Unpublish the survey as it has some survey taken");
			}
			return new Response(400,"Survey status is already closed/Unpublished");
		}else {
			return new Response(404,"No such Survey exist");
		}
	}
	
	public Object getSurveyToEditById(String id, String email) {
		List<Survey> surveyList = surveyRepository.findByIdAndAuthEmailAndStatus(Integer.parseInt(id), email, "Unpublished");
		if(surveyList.size() == 0) {
			System.out.println("LOLLLLLL");
			return new Response(404, "No such Survey Exist to edit");
		}else {
			return surveyList.get(0);
		}
	}

	public Object inviteToSurvey(String id, String email) {
		int code=0;
		String surveyCategory="";
		String url="";
		Invites invites=new Invites();
		List<Survey> survey = surveyRepository.findById(Integer.parseInt(id));
		
		//List<Survey> surveyList = surveyRepository.findByIdAndAuthEmailAndStatus(Integer.parseInt(id), email, "Unpublished");
		if(survey.size() == 0) {
			System.out.println("LOLLLLLL");
			return new Response(404, "No such Survey Exist");
		}else {
			surveyCategory= survey.get(0).getCategory();
			code=helper.codeGenerator();
			
			
			invites.setEmail(email);
			invites.setStatus(false);
			invites.setSurvey(survey.get(0));
			if(surveyCategory.equalsIgnoreCase("General"))
			{
				invites.setCode(Integer.parseInt(id));
				url=host+"general-survey/"+id +"/"+id;
			}
			else if(surveyCategory.equalsIgnoreCase("Closed"))
			{
				invites.setCode(code);
				url=host+"closed-survey/"+id +"/"+code;
			}
			else if(surveyCategory.equalsIgnoreCase("Open")) 
			{
				invites.setCode(code);
				url=host+"open-survey/"+id +"/"+code;
			}
			invitesRepository.save(invites);
				try {
					emailSenderService.inviteEmail(email, url);
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			}
		return invites;
	}

	public Object getAttemptedSurveys(String email) {
		//get attempted surveys of the user
		
		List<Survey_Submit_Info> serveySubmittedList = surveySubmitInfoRepository.findByEmail(email);
		
		if(serveySubmittedList.size() == 0) {
			System.out.println("LOLLLLLL");
			return new Response(404, "No Attempted Surveys");
		}else {
			return serveySubmittedList;
		}
		
		
	}

}
