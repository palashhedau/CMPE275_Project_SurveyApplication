import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {AuthService} from '../../landing/auth.service';
import {QuestionsSubmitSurvey} from './submit-survey-questions.model';
import {NgModel} from '@angular/forms';

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
  public errorMessage = '';

  public showSurveyArea = false;
  public email: string = '';
  @ViewChild('getEmail') getEmail : NgModel;

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private currentPath: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

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
      (response) => {

        this.isLoggedIn = this.authService.isLoggedIn;

        if(typeof response === 'object' &&  ( response.code === 404 || response.code === 400 ) ){
          this.router.navigate(['/not-found']);
        } else {
          if(response.email === this.authService.email){

            this.router.navigate(['/not-found']);
             return;
          }
          this.showSurveyArea = true;
          console.log(response);


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

    console.log(this.surveyService.questionToSubmitList.length + " " + this.questionList.length)
    // checking if all the questions answered
    if(status === 'Submitted' && this.surveyService.questionToSubmitList.length !== this.questionList.length){
      this.errorMessage = 'Please answer all the questions';
      return;
    }

    this.surveyService.submitSurvey(this.id, status, this.getEmail.value).subscribe(
        (response: ResponseParam) => {
          console.log(response)
          if(response.code === 404){
            this.router.navigate(['/not-found']);
          } else if(response.code === 200){
            this.router.navigate(['/survey/submit/success']);
          }
        },
        (error) => {
          this.router.navigate(['/survey/submit/failure']);
        }
      );
    }

}
