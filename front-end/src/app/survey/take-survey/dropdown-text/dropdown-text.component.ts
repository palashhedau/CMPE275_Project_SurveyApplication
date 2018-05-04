import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-dropdown-text',
  templateUrl: './dropdown-text.component.html',
  styleUrls: ['./dropdown-text.component.css']
})
export class DropdownTextComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('answerChoice') answerChoice: ngModel;
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
  }

  selectAnswer(){
    this.surveyService.setChoice(this.question.id , this.answerChoice.value, this.question.questionType);
  }
}