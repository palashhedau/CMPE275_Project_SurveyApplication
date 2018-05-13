import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() email: string;
  @Output('showNotification') showNotification = new EventEmitter<{type: string, body: string}>();
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {

    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.answer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  logData(){
    this.surveyService.setChoice(this.question.id , this.answer, this.question.questionType, this.email);
    this.showNotification.emit({type : 'Success' , body : 'Option saved Successfully'});
  }

}
