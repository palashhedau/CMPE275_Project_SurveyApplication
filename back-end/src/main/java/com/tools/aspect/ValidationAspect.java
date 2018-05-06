package com.tools.aspect;

import org.aspectj.lang.JoinPoint;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ValidationAspect {
	
	
	@Before("execution(* com.tools.controller.AuthenticationController.signup*(..))")
	public void after(JoinPoint joinPoint) {
		System.out.println("GEtting here");
//		addTweet(joinPoint.getArgs()[0].toString(), joinPoint.getArgs()[1].toString())
//		service.doesEmailAlreadyExist(emai)
	}

}
