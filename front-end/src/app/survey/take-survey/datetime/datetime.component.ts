import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {
  @Input() question: any;
  @Input() id: string;
  @Input() email: string;
  @ViewChild('selectedDate') selectedDate: NgModel;
  @Output('showNotification') showNotification = new EventEmitter<{type: string, body: string}>();

  public selectedAnswer: string;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
    if (this.question.surveySubmitResponseAnswers.length > 0) {
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  logDate(){
    this.surveyService.setChoice(this.question.id , this.selectedDate.value, this.question.questionType, this.email);
    this.showNotification.emit({type : 'Success' , body : 'Option saved Successfully'});

  }

}
