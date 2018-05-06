package com.tools.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.tools.responseParam.Response;

@Aspect
@Component
public class ValidationAspect {
	
	
	@Around("execution(* com.tools.service.AuthenticationService.signup*(..))")
	public Object after(JoinPoint joinPoint) {
		System.out.println("Getting into join");
//		addTweet(joinPoint.getArgs()[0].toString(), joinPoint.getArgs()[1].toString())
//		service.doesEmailAlreadyExist(emai)
		return new Response(400,"Email wtf exist");
	}

}
