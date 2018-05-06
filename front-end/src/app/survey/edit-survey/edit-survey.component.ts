import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {NgForm, NgModel} from '@angular/forms';
import {ResponseParam} from '../../ResponseParam.model';

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
              private route: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getSurveyToEdit();
      }
    );
  }

  getSurveyToEdit(){
    const _this = this;
    this.surveyService.getSurveyToEdit(this.id).subscribe(
      (response) => {
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
    console.log(this.questionList)
    this.errorMessage = '';
    if (this.allowCreateSurveyOrAddQuestion() === true) {
      this.createSurveyAsync('Unpublished');
      const questionObject = {
        id: 0,
        question: this.question.value,
        questionType: this.questionType.value,
        choice: [{id: 0, answers: ''},{id: 0, answers: ''}]
      };
      this.questionList.push(questionObject);
    } else {
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
            this.errorMessage = response.message;
          }
        },
        (error) =>{
          this.errorMessage = 'Error occured while saving survey';
        }
        );
    } else {
      this.errorMessage = 'Please check questions and correct its choices';
    }

  }

  deleteQuestion(data: {id: string}){
    this.errorMessage = '';
    this.questionList.splice(parseInt(data.id,10), 1);
    this.createSurveyAsync('Unpublished');
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
      if (!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No')) {
        if (currentQue.choice.length > 1 ) {
          for (const choice of currentQue.choice) {
            if (choice.answers.trim() === '') {
              return false;
            }
          }
        } else if ( type === 'Star Rating') {
          if (currentQue.choice.length === 0) {
            return false;
          }
        }  else {
          return false;
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

          }else{
            this.errorMessage = response.message;
          }
        },
        (error) =>{
          this.errorMessage = 'Error occured while saving survey';
        }
      );
    } else {
      this.errorMessage = 'Please check questions and correct its choices';
    }
  }

  saveRatingsChoice(data:{choice: string, sequence: string}){
    this.questionList[parseInt(data.sequence, 10)].choice[0]= data.choice;
  }

}
