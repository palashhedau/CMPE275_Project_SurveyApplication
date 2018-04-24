package com.tools.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Integer> {
	
}
