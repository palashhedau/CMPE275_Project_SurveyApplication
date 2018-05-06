package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tools.model.Invites;

public interface InvitesRepository extends JpaRepository<Invites,Integer> {
	//List<Survey> findById(int id);
	List<Invites> findBySurveyAndEmail(int survey_id,String email);
	List<Invites> findBySurveyAndStatus(int survey_id,int status);
	List<Invites> findByCodeAndEmail(int code,String email);
	List<Invites> findByCode(int code);
}
