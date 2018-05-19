import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {AuthService} from '../../landing/auth.service';
import {QuestionsSubmitSurvey} from './submit-survey-questions.model';
import {NgModel} from '@angular/forms';
import {GetSurveyResponseParams} from './get-survey-response-params.model';
import {SnotifyService} from 'ng-snotify';
import {Observable} from 'rxjs/Observable';
import {CanDeactivateGuard} from '../../deactivate-guared.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit, CanDeactivateGuard {
  public id: string;
  public questionList: any = [];
  public code: string;
  public  isLoggedIn = false;
  public errorMessage = '';
  public name : string;
  public showSurveyArea = false;
  public email = '';

  @ViewChild('getEmail') getEmail : NgModel;
  allowLeavePage = false;
  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private currentPath: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private snotifyService: SnotifyService) { }

  skipUser(){
    this.showSurveyArea = true ;
    this.getSurvey();
  }


  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.code = params['code'];
        this.surveyService.setSurveyCode(this.code);
        if(this.authService.isLoggedIn == true){
          this.showSurveyArea = true;
          this.getSurvey();
        }
      }
    );
  }

  getSurvey(){
    this.surveyService.getSurveyById(this.id, this.code, this.email).subscribe(
      (response : GetSurveyResponseParams) => {
        this.isLoggedIn = this.authService.isLoggedIn;

        if(typeof response === 'object' &&  ( response.code === 404 || response.code === 400 ) ){
          this.router.navigate(['/not-found'],{queryParams:{error: response.message}});
        }
        else {
          if(response.email === this.authService.email){
            this.router.navigate(['/not-found'], {queryParams : {error: 'You are not allowed to take your own survey'}});
            return;
          }
          console.log(response);
          this.name = response.name;
          this.showSurveyArea = true;

          const questionList = [];
          for (const question of response.questions){
            if(question.surveySubmitResponseAnswers.length > 0){
              const obj = new QuestionsSubmitSurvey(question.id);
              for(const answer of question.surveySubmitResponseAnswers){
                obj.setChoice(answer['answer'], question.question_type);
              }
              questionList.push(obj);
            }
          }

          this.surveyService.setSurveySubmittedList(questionList);
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
    this.errorMessage = ''

    // checking if all the questions answered
    if(status === 'Submitted' && this.surveyService.questionToSubmitList.length !== this.questionList.length){
      this.errorMessage = 'Please answer all the questions';
      this.showNotification({type:  'Error', body: 'Please answer all the questions'});
      return;
    }

    this.surveyService.submitSurvey(this.id, status, this.getEmail.value, this.email).subscribe(
        (response: ResponseParam) => {
          console.log(response)
          if(response.code === 404){
            this.router.navigate(['/not-found']);
          } else if(response.code === 200){
            this.allowLeavePage = true;
            this.router.navigate(['/survey/submit/success']);
          }
        },
        (error) => {
          this.showNotification({ type: 'Error', body :  'Error occured while saving the survey'});
        }
      );
    }

  showNotification(data: {type: string, body: string}){
    switch (data.type){
      case  'Success' :
        this.snotifyService.success(data.body, 'Status', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break ;
      case  'Error' :
        this.snotifyService.error(data.body, 'Status', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break;
    }
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean{
    if(this.allowLeavePage == true){
      return true;
    }
    if(this.allowLeavePage === false){
      if (confirm('All unsaved changes will be lost. Are you sure you want to navigate away ?')) {
        return true ;
      } else {
        return false;
      }
    }
  }


}
