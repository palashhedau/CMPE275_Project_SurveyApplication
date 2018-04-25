package com.tools.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tools.model.Auth;

@Repository
public interface AuthRepository extends JpaRepository<Auth,Integer> {
	List<Auth> findByEmail(String email); 
	List<Auth> findById(int id); 
	
}
