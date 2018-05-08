package com.tools.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tools.model.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Integer> {
	List<Survey> findById(int id);
	List<Survey> findByEmail(String id);
	List<Survey> findByIdAndStatus(int id, String status);
	List<Survey> findByIdAndEmail(int id, String email);
	List<Survey> findByIdAndEmailAndStatus(int id, String email, String status);
	List<Survey> findByIdAndSubmittedSurveryUserEmailAndSubmittedSurveryStatus(int id, String email, String status);

	@Query(value="SELECT * FROM survey s where s.end_time < :today && status!= 'Closed'", nativeQuery=true) 
	List<Survey> findExpriredSurveys(@Param("today") Date today);
	
	List<Survey> findBySubmittedSurveryUserEmail(String email);
	List<Survey> findBySubmittedSurveryUserEmailAndId(String email, int id);

} 
