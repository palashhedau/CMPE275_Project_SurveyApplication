import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  public id: string;
  public questionList: any = [];

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private currentPath: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

    this.surveyService.getSurveyById(this.id).subscribe(
      (response) => {
        console.log(typeof response);
        if(typeof response === 'object' && response.code === 404){
          this.router.navigate(['/not-found']);
        }else{
          this.questionList = response[0].questions;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitSurvey(){
    this.surveyService.submitSurvey(this.id).subscribe(
      (response) => {
        if(response.code === 404){
          this.router.navigate(['/not-found']);
        }else if(response.code === 200){
          this.router.navigate(['/survey/submit/success']);
        }
      },
      (error) => {
        this.router.navigate(['/survey/submit/failure']);
      }
    );
  }
}
