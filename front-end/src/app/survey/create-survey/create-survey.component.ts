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

  @ViewChild('questionType')questionType: NgModel;
  @ViewChild('question')question: NgModel;
  @ViewChild('category')category: NgModel;
  @ViewChild('endDate')date: NgModel;
  @ViewChild('name')formName: NgModel;

  public defaultQuestionChoice = '';

  public questionList: any = [];


  constructor(private surveyService: SurveyService,
              private router: Router){}

  ngOnInit() {
  }

  addQuestion() {

    if (this.surveyService.addQuestion(this.question.value , this.questionType.value) === true) {
      this.questionList.push([this.questionType.value, this.question.value]);
      this.defaultQuestionChoice = '';
      console.log(this.questionList);
    } else {
      console.log("Not a good way to add");
      // give error and dont allow new question
      this.defaultQuestionChoice = '';
    }
  }

  saveChoice(data: {choice: string, sequence: number , id: string}) {
    this.surveyService.addChoice(data.choice , data.sequence , data.id);
  }

  createSurvey(status: string) {
    const allowCreateSurvey: boolean = this.surveyService.allowCreateSurvey();

    if(allowCreateSurvey === true ) {
      let name = this.formName.value;
      let category = this.category.value;
      let dateVar = this.date.value;
      this.surveyService.createSurvey(name, category, dateVar, status).subscribe(
        (response) => {
          if (response.code === 200) {
            this.router.navigate(['/survey/create/success'])
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
    this.questionList.splice(parseInt(data.id,10), 1);
    this.surveyService.deleteQuestion(parseInt(data.id,10));
  }

  saveRatingsChoice(data: {choice: string , sequence: string}) {
    this.surveyService.saveRatingsChoice(data.choice, data.sequence);
  }
}
