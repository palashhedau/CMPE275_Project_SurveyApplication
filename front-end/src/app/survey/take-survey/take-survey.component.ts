import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {AuthService} from '../../landing/auth.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  public id: string;
  public questionList: any = [];
  public code: string;
  public  isLoggedIn = false;

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private currentPath: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.code = params['code'];
        this.surveyService.setSurveyCode(this.code);
      }
    );


    this.surveyService.getSurveyById(this.id, this.code).subscribe(
      (response) => {
        console.log(typeof response);
        this.isLoggedIn = this.authService.isLoggedIn;
        if(typeof response === 'object' && response.code === 404){
          this.router.navigate(['/not-found']);
        } else {
          console.log(this.authService.email + " " + response.email)
          if(response.email === this.authService.email){
            /*this.router.navigate(['/not-found']);
            return;*/
          }

         /* CHange code here to assign only the*/
          this.questionList = response.questions;
          this.surveyService.setSurveyId(this.id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitSurvey(status: string){
    this.surveyService.submitSurvey(this.id, status).subscribe(
      (response: ResponseParam) => {
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
