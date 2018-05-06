import { Component, OnInit } from '@angular/core';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {

  public surveyList: any = [];
  public errorMessage = '';
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.getSurveys();
  }

  getSurveys(){
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

  closeSurvey(id: string){
    this.errorMessage = '';
    const _this = this;
    this.surveyService.closeSurvey(id).subscribe(
      (response: ResponseParam) => {
        _this.errorMessage = response.message;
        _this.getSurveys();
      },
      (error) => {
        this.errorMessage = 'Error occured while closing the survey.';
      }
    );
  }


}
