package com.tools ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class Cmpe275SurveyApplication {

	public static void main(String[] args) {
		SpringApplication.run(Cmpe275SurveyApplication.class, args);
	}
}
