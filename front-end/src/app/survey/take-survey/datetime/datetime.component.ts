import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {
  @Input() question: any;
  @Input() id: string;
  @ViewChild('selectedDate') selectedDate: ngModel;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
  }

  logDate(){
    this.surveyService.setChoice(this.question.id , this.selectedDate.value, this.question.questionType);
  }

}
