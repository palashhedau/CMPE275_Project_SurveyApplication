import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';

@Component({
  selector: 'app-survey-stats-view-single-response',
  templateUrl: './survey-stats-view-single-response.component.html',
  styleUrls: ['./survey-stats-view-single-response.component.css']
})
export class SurveyStatsViewSingleResponseComponent implements OnInit {
  public questionId : number;
  public response = {};
  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.questionId = +params['questionid'];
        this.getQuestionResponses(this.questionId);
      }
    );
  }

  getQuestionResponses(questionid : number){
    this.surveyService.getQuestionResponses(questionid).subscribe(
      (response: ResponseParam) => {
        if (response.code === undefined) {
          this.response = response;
          console.log(this.response)
        }
      },
      (error) => {
        console.log('Error occured while fetching stats');
      }
    );
  }



}
