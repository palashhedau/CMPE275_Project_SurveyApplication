import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {NgForm, NgModel} from '@angular/forms';
import {ResponseParam} from '../../ResponseParam.model';
import {GetSurveyResponseParams} from '../take-survey/get-survey-response-params.model';
import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  @ViewChild('questionType')questionType: NgModel;
  @ViewChild('question')question: NgModel;
  category: string;
  date: string;
  formName: string;

  public id: string;
  public data: any = {};
  public defaultQuestionChoice = '';
  public errorMessage = '';

  public questionList: any = [];

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private route: Router,
              private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getSurveyToEdit();
      }
    );
  }

  disable(){
    if (this.formName === '' || this.category === ''){
      return true;
    } else {
      return false;
    }
  }

  getSurveyToEdit(){
    this.surveyService.getSurveyToEdit(this.id).subscribe(
      (response : GetSurveyResponseParams) => {
        if (response.code === 'undefined') {
          this.route.navigate(['/not-found']);
        } else {
          console.log(response);
          this.category = response.category;
          this.formName = response.name;
          this.date = response.endTime;
          this.questionList = response.questions;
          this.data = response;
        }
      },
      (error) => {
        console.log('error');
      }
    );
  }

  addQuestion() {
    this.errorMessage = '';
    if (this.allowCreateSurveyOrAddQuestion() === true) {
      this.createSurveyAsync('Unpublished');

      let choiceToBeSubstituted = [{id: 0, answers: ''},{id: 0, answers: ''}]

      /*if(this.questionType.value == 'Star Rating'){
        choiceToBeSubstituted = [{id: 0, answers: ''}]
      }*/

      const type = this.questionType.value;
      if(( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating' )) {
        choiceToBeSubstituted = [];
      }

      const questionObject = {
        id: 0,
        question: this.question.value,
        questionType: this.questionType.value,
        choice: choiceToBeSubstituted
      };
      this.questionList.push(questionObject);
    } else {
      this.showNotification('Error', 'Please check all question and correct its values before adding new');
      this.errorMessage = 'Please check all question and correct its values before adding new';
    }
    this.defaultQuestionChoice = '';
  }

  createSurvey(status: string){
    this.errorMessage = '';
    if (this.allowCreateSurveyOrAddQuestion() === true) {
      //create survey API call
      const editObject = {
        category : this.category,
        id : this.data.id,
        creator: this.data.creator,
        endTime : this.date,
        name: this.formName,
        publish : true,
        questions: this.questionList,
        status: status
      };
      this.surveyService.editSurvey(editObject).subscribe(
        (response: ResponseParam) => {
          if (response.code === 200){
              this.route.navigate(['survey', 'create' , 'success']);
          }else{
            this.showNotification('Error', response.message);
            this.errorMessage = response.message;
          }
        },
        (error) =>{
          this.errorMessage = 'Error occured while saving survey';
        }
        );
    } else {
      this.showNotification('Error', 'Please check questions and correct its choices');
      this.errorMessage = 'Please check questions and correct its choices';
    }

  }

  deleteQuestion(data: {id: string}){
    this.errorMessage = '';
    this.questionList.splice(parseInt(data.id,10), 1);
    this.createSurveyAsync('Unpublished');
  }

  saveEditedQuestion(data: {question: string , id: string}){
      this.questionList[parseInt(data.id,10)]['question'] = data.question;
  }

  saveChoice(data: {choice: string, sequence: number , id: string}){
      const currentQue = this.questionList[parseInt(data.id,10)];
      const choiceObject = {
        id : 0,
        answers : data.choice
      };

      if (currentQue.choice.length > data.sequence){
        currentQue.choice[data.sequence] = choiceObject;
      } else if(currentQue.choice.length === data.sequence) {
        currentQue.choice.push(choiceObject);
      }
      this.questionList[parseInt(data.id,10)] = currentQue;
  }

  allowCreateSurveyOrAddQuestion() {

    for (const currentQue of this.questionList) {
      const type: string = currentQue.questionType;
    /*  if ( type === 'Star Rating') {
        if (currentQue.choice.length === 0 || (currentQue.choice[0]['answers'] === '') ) {
          return false;
        }
      }*/
      if (!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating')) {
        if (currentQue.choice.length > 1 ) {
          for (const choice of currentQue.choice) {
            if (choice.answers.trim() === '') {
             return false;
            }
          }
        }
      }
    }
    return true;
  }

  deleteOptions(data:{sequence: number , id: string}){
    this.questionList[parseInt(data.id,10)].choice.splice(data.sequence,1);
  }

  createSurveyAsync(status: string){
    this.errorMessage = '';
    if (this.allowCreateSurveyOrAddQuestion() === true) {
      const editObject = {
        category : this.category,
        id : this.data.id,
        creator: this.data.creator,
        endTime : this.date,
        name: this.formName,
        publish : true,
        questions: this.questionList,
        status: status
      }
      this.surveyService.editSurvey(editObject).subscribe(
        (response: ResponseParam) => {
          if (response.code === 200){
            this.showNotification('Success', response.message);
          } else {
            this.errorMessage = response.message;
            this.showNotification('Error', response.message);
          }
        },
        (error) =>{
          this.showNotification('Error', 'Error occured while saving survey');
          this.errorMessage = 'Error occured while saving survey';
        }
      );
    } else {
      this.showNotification('Error', 'Please check questions and correct its choices');
      this.errorMessage = 'Please check questions and correct its choices';
    }
  }



  showNotification(type: string, body: string ){
    switch (type){
      case  'Success' :
        this.snotifyService.success(body, 'Status', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break ;
      case  'Error' :
        this.snotifyService.error(body, 'Status', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break;
    }
  }

}
