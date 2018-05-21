import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-single-option-text',
  templateUrl: './single-option-text.component.html',
  styleUrls: ['./single-option-text.component.css']
})
export class SingleOptionTextComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('options') option: NgModel;
  @Input() email: string;
  @Output('showNotification') showNotification = new EventEmitter<{type: string, body: string}>();
  public choices: string [] = [];
  public selectedAnswer: string;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;
    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  getValue(choice: any) {
    this.surveyService.setChoice(this.question.id , choice['answers'], this.question.questionType, this.email);
    this.showNotification.emit({type : 'Success' , body : 'Option saved Successfully'});

  }

}
