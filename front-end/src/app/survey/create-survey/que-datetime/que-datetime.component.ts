import { Component, OnInit } from '@angular/core';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-que-datetime',
  templateUrl: './que-datetime.component.html',
  styleUrls: ['./que-datetime.component.css']
})
export class QueDatetimeComponent implements OnInit {

  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
  }

  typeMessage() {
    this.surveyService.getMessage('DAtetime');
  }

}
