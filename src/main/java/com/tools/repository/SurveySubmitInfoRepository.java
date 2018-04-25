package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Auth;

import com.tools.model.Survey_Submit_Info;

@Repository
public interface SurveySubmitInfoRepository extends JpaRepository<Survey_Submit_Info,Integer> {

	
}
