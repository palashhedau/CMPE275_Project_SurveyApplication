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
  @ViewChild('answer') answer: NgModel;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
  }

  logData(){
    this.surveyService.setChoice(this.question.id , this.answer.value, this.question.questionType);
  }

}
