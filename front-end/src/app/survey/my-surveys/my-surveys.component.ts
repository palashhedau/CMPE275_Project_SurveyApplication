import { Component, OnInit } from '@angular/core';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {

  public surveyList: any ;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.surveyService.getMySurveys().subscribe(
      (response) => {
        this.surveyList = response;
        console.log(this.surveyList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
