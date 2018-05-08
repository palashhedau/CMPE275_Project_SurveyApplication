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
import org.springframework.web.bind.annotation.PathVariable;

import com.tools.helper.Helper;
import com.tools.model.Auth;
import com.tools.model.Choice;
import com.tools.model.Invites;
import com.tools.model.Questions;
import com.tools.model.Survey;
import com.tools.model.Survey_Submit_Info;

import com.tools.model.Survey_Submit_Response_Answers;
import com.tools.repository.AuthRepository;
import com.tools.repository.InvitesRepository;
import com.tools.repository.QuestionsRepository;
import com.tools.repository.SurveyRepository;
import com.tools.repository.SurveySubmitInfoRepository;
import com.tools.repository.SurveySubmitResponseAnswerRepository;

import com.tools.requestParams.EditSurveyChoiceParams;
import com.tools.requestParams.EditSurveyParams;
import com.tools.requestParams.EditSurveyQuestionParams;
import com.tools.requestParams.QuestionsAndAnswers;
import com.tools.requestParams.SubmitSurveyQueList;
import com.tools.requestParams.SurveyCreateParams;
import com.tools.requestParams.SurveySubmitParams;
import com.tools.responseParam.Response;
import com.tools.responseParam.ResponseWithId;
import com.tools.responseParam.SurveyStats;

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
	
	
	@Autowired
	private SurveySubmitResponseAnswerRepository surveySubmitResponseAnswerRepository;
	
	Helper helper = new Helper();
	String host="http://localhost/survey/take-survey/";
	
	public Object createSurvey(SurveyCreateParams params, String email) {
		System.out.println("New ID to add ? " + params.getId());
		Survey survey = new Survey(email , params.getPublish() , 
				params.getEndTime().equalsIgnoreCase("")? null : helper.parseDate(params.getEndTime()) ,
				params.getType(), params.getStatus(), params.getCategory());
		
		
		if(params.getId() != 0) {
			survey = surveyRepository.findById(params.getId()).get(0);
			survey.setQuestions(new HashSet<Questions>());
			questionsRepository.deleteBySurveyId(params.getId());
		}else {
			survey.setEmail(email);
			survey.setName(params.getName());
		}
		
		if(params.getStatus().equalsIgnoreCase("Published") && survey.getStartTime() != null) {
			survey.setStartTime(new Date());
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
		
		Survey survey = surveyRepository.findById(params.getId()).get(0);
		survey.setQuestions(new HashSet<Questions>());
		questionsRepository.deleteBySurveyId(params.getId());
		
		if(params.getStatus().equalsIgnoreCase("Published") && survey.getStartTime() != null) {
			survey.setStartTime(new Date());
		}
		
		for(EditSurveyQuestionParams que : params.getQuestions()) {
			
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

	// 7.c - Not sure if used
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
		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			// 7.d
			if(survey.getEndTime() == null && 
					( ! survey.getStatus().equalsIgnoreCase("Closed"))) {
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
			
			// check if user is eligible to submit the survey
			// check if already submitted 
			boolean allowSubmit = true;		
			if(!survey.getCategory().equalsIgnoreCase("General")) {
				List<Invites> invites = invitesRepository.findBySurveyIdAndStatusAndEmailAndCode(Integer.parseInt(id), false, email, Integer.parseInt(code));
				if(invites.size() == 0) {
					return new Response(400, "Either you have already filled the "
							+ "survey or you are not eligible");
				}
			}
			
			
			
			// Submitting the survey
			if(survey.getStatus().equalsIgnoreCase("Published") && 
					 survey.getEndTime() != null ? helper.compareDate(new Date(), survey.getEndTime()):
						 true
					) {

				//check if this survey is taken my the email id or not?
				List<Survey_Submit_Info> infoList = surveySubmitInfoRepository.findByUserEmailAndStatusAndSurveyId(email, "Saved" , Integer.parseInt(id));
				
				Survey_Submit_Info info = new Survey_Submit_Info();
				
				if(infoList.size() > 0) {
					info = infoList.get(0);
					// delete old response
					surveySubmitResponseAnswerRepository.deleteByQuestionsSurveySubmittedSurveryId(info.getId());
				}else {
					info.setSurvey(survey);
					info.setUserEmail(email);
				}
			
				info.setStatus(params.getStatus());
				
				List<SubmitSurveyQueList> questionsList  = params.getQuestionList() ;
				
				for(SubmitSurveyQueList list : questionsList) {
					
					// find question by ID
					Questions que = questionsRepository.findById(list.getQuestionId()).get(0);
					
					
					for(String ans : list.getChoice()) {
						Survey_Submit_Response_Answers answer = new Survey_Submit_Response_Answers();
						answer.setAnswer(ans);
						answer.setQuestions(que);
						surveySubmitResponseAnswerRepository.save(answer);
					}
				}
				surveySubmitInfoRepository.save(info);
				
				if(email!=null || !email.equals(""))
				{
					try {
						emailSenderService.surveySubmitEmail(email,survey.getName());
					} catch (MessagingException e) {
						e.printStackTrace();
					}
				}
				
				if(!survey.getCategory().equalsIgnoreCase("General"))
				{
					List<Invites> invites=invitesRepository.findByCodeAndEmail(Integer.parseInt(code),email);
					if(invites.size()>0)
					{
						Invites inv=invites.get(0);
						inv.setStatus(true);
						invitesRepository.save(inv);
					}
				}
				return new Response(200, "Survey submitted successfully");
				}else return new Response(404, "Survey Not active");
		}else return new Response(404, "Survey Not Found");
	}



	
	public Object getSurvey(String email) {
		return surveyRepository.findByEmail(email);
	}



	public Object getSurveyById(String id, int code, String email) {
		System.out.println("Mai bulaya isko");
		
		
		
		//check if user eligible for taking survey
		List<Survey> surveyList = surveyRepository.findByIdAndStatus(Integer.parseInt(id), "Published");
		
		if(surveyList.size() == 0) {
			return new Response(404, "No such Survey Exist");
		}
		else {
			
			//get their unfinished survey if any
			if(!email.equalsIgnoreCase("")) {
				 List<Survey> alreadyUsedSurvey = surveyRepository.
						 findByIdAndSubmittedSurveryUserEmailAndSubmittedSurveryStatus
						 (Integer.parseInt(id),email,"Saved");
				 if(alreadyUsedSurvey.size() == 1) {
					 return alreadyUsedSurvey.get(0);
				 }
			}
			
			Survey survey = surveyList.get(0);
			survey.setSubmittedSurvery(null);
			
			if(survey.getCategory().equalsIgnoreCase("General")) {
				System.out.println("General ");
				return survey ;
			}else if(survey.getCategory().equalsIgnoreCase("Open") || survey.getCategory().equalsIgnoreCase("Closed")) {
				if(!email.equalsIgnoreCase("")) {
					if(invitesRepository.findBySurveyIdAndStatusAndEmailAndCode(Integer.parseInt(id),false, email, code).size()>0) {
						return survey;
					}
					else return new Response(400, "Not Authorized to view the survey");
				}else {
					return new Response(400,"Not allowed to view the survey");
				}
			}
			return survey; 
		}
		
	}



	public Object viewSurveyById(String id, String email) {
		List<Survey> surveyList = surveyRepository.findByIdAndEmail(Integer.parseInt(id), email);
		if(surveyList.size()>0) {
			return surveyList.get(0);
		}else {
			return new Response(404,"Not Authorized to view the survey");
		}
		
	}



	public Object unPublishSurveyById(String id, String attribute) {

		List<Survey> surveyList = surveyRepository.findById(Integer.parseInt(id)) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			
			// 7.b.1
			if(survey.getCreator().equalsIgnoreCase(attribute))
			{
				if((survey.getStatus().equalsIgnoreCase("Published"))) {
					System.out.println("YAHA AAYA 3");
					if( survey.getSubmittedSurvery().size() == 0) {
						survey.setStatus("Unpublished");
						surveyRepository.save(survey);
						System.out.println("YAHA AAYA 4");
						return new Response(200,"Successfully Unpublished the survey");
					};
					return new  Response(400,"Cannot Unpublish the survey as it has some survey taken");
				}
				return new Response(400,"Survey status is already closed/Unpublished");
			}
			else
				return new Response(400,"Yoy don't have rights to unpublish this survey as you are not the owner of this survey.");			
		}else {
			return new Response(404,"No such Survey exist");
		}
	}
	
	public Object publishSurveyById(String id, String email) {
		List<Survey> surveyList = surveyRepository.findByIdAndEmail(Integer.parseInt(id),email) ;
		if(surveyList.size() == 1 ) {
			Survey survey = surveyList.get(0);
			if(survey.getStatus().equalsIgnoreCase("Unpublished")) {
				survey.setStatus("Published");
				surveyRepository.save(survey);
				survey.setStartTime(new Date());
				return new Response(200,"Successfully published the survey");
			}
			return new Response(400,"Survey status is already closed/published");
		}else {
			return new Response(404,"No such Survey exist");
		}
	}
	
	
	
	public Object getSurveyToEditById(String id, String email) {
		List<Survey> surveyList = surveyRepository.findByIdAndEmailAndStatus(Integer.parseInt(id), email, "Unpublished");
		if(surveyList.size() == 0) {
			return new Response(404, "No such Survey Exist to edit");
		}else {
			return surveyList.get(0);
		}
	}

	public Object inviteToSurvey(String id, String email,  String owner) {
		int code=0;
		
		String surveyCategory="";
		String url="";
		Invites invites=new Invites();
		
		List<Survey> survey = surveyRepository.findById(Integer.parseInt(id));
		
List<Auth> _users=authRepository.findByEmail(email);
		boolean isUserRegisterd=false;
		if(_users.size()>0)
		{
			isUserRegisterd=true;
		}
		

		if(survey.size() == 0) {
			return new Response(404, "No such Survey Exist");
		}else {
			
			if(!survey.get(0).getCreator().equalsIgnoreCase(owner)) {
				return new Response(400, "You are nit eligible to invite to this survey");
			}
			
			List<Auth> _users=authRepository.findByEmail(email);
			boolean isUserRegisterd=false;
			if(_users.size()>0)
			{
				isUserRegisterd=true;
			}
			
			surveyCategory= survey.get(0).getCategory();
			code=helper.codeGenerator();
			
			if(surveyCategory.equalsIgnoreCase("General"))
			{
				invites.setCode(Integer.parseInt(id));
				url=host +id + "/" + id;
			}
			else if(surveyCategory.equalsIgnoreCase("Closed"))
			{

				if(isUserRegisterd)
				{
					invites.setCode(code);
					url=host + id + "/" + code;
				}

				else return new Response(400,"User not registered");

			}
			else if(surveyCategory.equalsIgnoreCase("Open")) 
			{
				invites.setCode(code);
				url=host + id +"/"+code;
			}
			
			invites.setEmail(email);
			invites.setStatus(false);
			invites.setSurvey(survey.get(0));
			
			invitesRepository.save(invites);
				try {
					emailSenderService.inviteEmail(email, url);
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			}
		return new Response(200,"Successfully invited");
	}

	public Object getAttemptedSurveys(String email) {
		
		List<Survey> serveyList = surveyRepository.findBySubmittedSurveryUserEmail(email);
		
		
		if(serveyList.size() == 0) {
			return new Response(404, "You have not attempted any surveys yet");
		}else {
			System.out.println("This are the attempted survey " + serveyList.size());
			return serveyList;
		}
	}

	public Object viewMyResponse(String email, String id) {
		List<Survey> surveyList = surveyRepository.findBySubmittedSurveryUserEmailAndId(email,Integer.parseInt(id));
		if(surveyList.size()>0) {
			return surveyList.get(0).getQuestions();
		}
		return new Response(404, "No Such Survey Exist");
	}
	
	public Object getSurveryStats(int id) {
		List<Survey> surveyList = surveyRepository.findById(id);
		if(surveyList!= null && surveyList.size() > 0) {
			Survey survey = surveyList.get(0);
			SurveyStats stats = new SurveyStats();
			stats.setStartTime(survey.getStartTime());
			stats.setEndTime(survey.getEndTime());
			stats.setParticipants(survey.getSubmittedSurvery().size());
			stats.setParticipationRate(survey.getSubmittedSurvery().size()/survey.getInvites().size());
			return stats;	
		} else {
			return new Response(404, "No such survey exists to edit");	
		}
	}


}
