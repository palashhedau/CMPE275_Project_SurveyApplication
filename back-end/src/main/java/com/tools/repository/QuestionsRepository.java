package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Auth;
import com.tools.model.Questions;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions,Integer> {
	List<Questions> findById(int id); 
	void deleteBySurveyId(int id);
}
