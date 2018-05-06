package com.tools.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tools.requestParams.Auth;
import com.tools.requestParams.VerifyAccount;
import com.tools.responseParam.Response;
import com.tools.service.ValidationService;

@Aspect
@Component
public class ValidationAspect {
	
	@Autowired 
	ValidationService vs;
	
	
	@Around("execution(* com.tools.service.AuthenticationService.signup*(..))")
	public Object signup(ProceedingJoinPoint joinPoint) {
		try {
			Auth auth = ((Auth)joinPoint.getArgs()[0]);
			Response response = vs.signup(auth);
			if(response.getCode() == 200) {
				return joinPoint.proceed();
			} else {
				return response;
			}
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new Response(500,"Looks like something went wrong");
	}
	
	@Around("execution(* com.tools.service.AuthenticationService.activateAccount*(..))")
	public Object verifyAccount(ProceedingJoinPoint joinPoint) {
		try {
			VerifyAccount details = ((VerifyAccount)joinPoint.getArgs()[0]);
			Response response = vs.verifyAccount(details);
			if(response.getCode() == 200) {
				return joinPoint.proceed();
			} else {
				return response;
			}
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new Response(500,"Looks like something went wrong");
	}
}
