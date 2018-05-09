package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Auth;
import com.tools.model.Survey_Submit_Info;
import com.tools.model.Survey_Submit_Response_Answers;

@Repository
public interface SurveySubmitResponseAnswerRepository extends JpaRepository<Survey_Submit_Response_Answers,Integer> {
	List<Survey_Submit_Response_Answers> deleteByQuestionsSurveySubmittedSurveryId(int id);
	List<Survey_Submit_Response_Answers> findByQuestionsIdAndAnswer(int questionsId, String answer);
}
