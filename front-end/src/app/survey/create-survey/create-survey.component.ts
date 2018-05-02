import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {SurveyService} from '../survey-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  @ViewChild('form')createForm: NgForm;
  @ViewChild('name')formName: NgModel;
  @ViewChild('type')questionType: NgModel;
  @ViewChild('question')question: NgModel;
  public defaultQuestionChoice = '';

  public questionList: any = [[]];


  constructor(private surveyService: SurveyService,
              private router: Router,
              private currentRoute: ActivatedRoute){}

  ngOnInit() {
  }

  addQuestion() {
    if (this.surveyService.addQuestion(this.question.value , this.questionType.value) === true) {
      this.questionList.push([this.questionType.value, this.question.value]);
      this.defaultQuestionChoice = '';
    } else {
      // give error and dont allow new question
      this.defaultQuestionChoice = '';
    }
  }

  saveChoice(data: {choice: string, sequence: number}) {
    this.surveyService.addChoice(data.choice , data.sequence);
  }

  createSurvey(form: HTMLFormElement) {
    console.log(form)
    const allowCreateSurvey: boolean = this.surveyService.allowCreateSurvey();

    if(allowCreateSurvey === true ) {
      this.surveyService.createSurvey(this.formName.value).subscribe(
        (response) => {
          if (response.code === 200) {
            this.router.navigate(['/survey/create/success'],{relativeTo: this.currentRoute})
          } else {
            this.router.navigate(['/survey/create/failure']);
          }
        },
        (error) => {
          this.router.navigate(['/survey/create/failure']);
        }
      )
    } else {
      // give error message - Please check all questions
    }
  }

  deleteQuestion(data: {id: string}){
    console.log(data.id);
  }
}
