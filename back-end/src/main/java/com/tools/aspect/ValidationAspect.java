package com.tools.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.springframework.beans.factory.annotation.Autowired;

import com.tools.service.ValidationService;

public class ValidationAspect {
	
	
	@Autowired ValidationService service;

	
	@AfterReturning(pointcut="execution(public void com.tools.controller.AuthenticationController.signup(..))" ,returning = "result")

	public void addTweet(JoinPoint joinPoint , Object result) {
		System.out.println("GEtting here");
//		addTweet(joinPoint.getArgs()[0].toString(), joinPoint.getArgs()[1].toString())
//		service.doesEmailAlreadyExist(email)
	}

}
