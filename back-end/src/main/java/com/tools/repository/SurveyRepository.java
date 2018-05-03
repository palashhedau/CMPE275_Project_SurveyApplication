package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Integer> {
	List<Survey> findById(int id);
	List<Survey> findByAuthId(int id);
	List<Survey> findByIdAndStatus(int id, String status);
}
