package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tools.model.Invites;

public interface InvitesRepository extends JpaRepository<Invites,Integer> {
	//List<Survey> findById(int id);
	List<Invites> findBySurveyAndEmail(int survey_id,String email);
	List<Invites> findBySurveyIdAndStatus(int survey_id,boolean status);
	List<Invites> findByCodeAndEmail(int code,String email);
	List<Invites> findByCode(int code);
	List<Invites> findBySurveyIdAndStatusAndEmailAndCode(int survey_id,boolean status, String email,
			int code);
}
