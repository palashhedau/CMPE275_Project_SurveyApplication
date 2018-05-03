import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-single-option-text',
  templateUrl: './single-option-text.component.html',
  styleUrls: ['./single-option-text.component.css']
})
export class SingleOptionTextComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('options') option: ngModel;

  public choices: string [] = [];
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;
  }

  getValue(choice: any) {
    this.surveyService.setChoice(this.question.id , choice['answers'], this.question.questionType);
  }

}
