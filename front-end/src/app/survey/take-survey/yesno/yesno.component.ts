import {Component, Input, OnInit} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.css']
})
export class YesnoComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
  }

  logData(choice){
    this.surveyService.setChoice(this.question.id , choice, this.question.questionType);
  }

}