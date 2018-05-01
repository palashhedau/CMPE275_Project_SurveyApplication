import {Component, Input, OnInit} from '@angular/core';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-que-datetime',
  templateUrl: './que-datetime.component.html',
  styleUrls: ['./que-datetime.component.css']
})
export class QueDatetimeComponent implements OnInit {
  @Input('question') question: string;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
  }

  typeMessage() {
    this.surveyService.getMessage('DAtetime');
  }

}
