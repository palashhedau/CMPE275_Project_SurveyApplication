import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-single-option-image',
  templateUrl: './single-option-image.component.html',
  styleUrls: ['./single-option-image.component.css']
})
export class SingleOptionImageComponent implements OnInit {
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
