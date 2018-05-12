import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  public choices: string [] = [];
  public selectedAnswer: string;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;
    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
      console.log("this.selectedAnswer " + this.selectedAnswer)
    }
  }

  getValue(choice: any) {
    this.surveyService.setChoice(this.question.id , choice['answers'], this.question.questionType, this.email);
  }

}
