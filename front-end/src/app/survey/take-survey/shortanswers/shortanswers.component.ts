import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-shortanswers',
  templateUrl: './shortanswers.component.html',
  styleUrls: ['./shortanswers.component.css']
})
export class ShortanswersComponent implements OnInit {
  @Input('question') question: any;
  @Input('id') id: string;
  public answer: string;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {

    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.answer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  logData(){
    this.surveyService.setChoice(this.question.id , this.answer, this.question.questionType);
  }

}
