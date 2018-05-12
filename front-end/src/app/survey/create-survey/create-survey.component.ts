import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {SurveyService} from '../survey-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GetSurveyResponseParams} from '../take-survey/get-survey-response-params.model';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  @ViewChild('form')createForm: NgForm;

  @ViewChild('questionType')questionType: NgModel;
  @ViewChild('question')question: NgModel;
  @ViewChild('category')category: NgModel;
  @ViewChild('endDate')date: NgModel;
  @ViewChild('name')formName: NgModel;

  public defaultQuestionChoice = '';
  public errorMessage = '';
  public questionList: any = [];


  constructor(private surveyService: SurveyService,
              private router: Router){}

  ngOnInit() {
  }

  addQuestion() {
    this.errorMessage = '';
    if (this.surveyService.addQuestion(this.question.value , this.questionType.value,
      this.formName.value, this.category.value, this.date.value) === true) {
      this.questionList.push([this.questionType.value, this.question.value]);
      this.defaultQuestionChoice = '';
    } else {
      this.errorMessage = 'Please check previous question and insert proper values';
      this.defaultQuestionChoice = '';
    }
  }

  saveChoice(data: {choice: string, sequence: number , id: string}) {
    this.errorMessage = '';
    this.surveyService.addChoice(data.choice , data.sequence , data.id);
  }

  createSurvey(status: string) {
    this.errorMessage = '';
    const allowCreateSurvey: boolean = this.surveyService.allowCreateSurvey();
    if(allowCreateSurvey === true ) {
      let name = this.formName.value;
      let category = this.category.value;
      let dateVar = this.date.value;
      this.surveyService.createSurvey(name, category, dateVar, status).subscribe(
        (response : GetSurveyResponseParams) => {
          this.surveyService.resetVariables();
          if (response.code === 200) {
            this.router.navigate(['/survey/create/success'])
          } else {
            this.router.navigate(['/survey/create/failure']);
          }
        },
        (error) => {
          this.router.navigate(['/survey/create/failure']);
        }
      );
    } else {
      this.errorMessage = 'Check all the questions and choices properly/ Check if any question added or not';
    }
  }

  deleteQuestion(data: {id: string}){
    this.questionList.splice(parseInt(data.id,10), 1);
    this.surveyService.deleteQuestion(parseInt(data.id,10));
  }

}
