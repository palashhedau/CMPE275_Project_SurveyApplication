import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {SurveyService} from './survey-service.service';

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

  public questionList: string [] = []


  constructor(private surveyService: SurveyService){}

  ngOnInit() {
  }

  addQuestion() {
    console.log("Adding question");
    this.questionList.push(this.questionType.value);
    this.surveyService.addQuestion(this.question.value , this.questionType.value);
  }

  saveChoice(data: {choice: string, sequence: number}) {
    this.surveyService.addChoice(data.choice , data.sequence);
  }

  submitQuestion() {
   this.surveyService.showSendingObject();
  }
}
