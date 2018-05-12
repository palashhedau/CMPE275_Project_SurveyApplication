import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-single-option-image',
  templateUrl: './single-option-image.component.html',
  styleUrls: ['./single-option-image.component.css']
})
export class SingleOptionImageComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('options') option: NgModel;
  @Input() email: string;
  public choices: string [] = [];
  public selectedAnswer: string;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;
    console.log("COCO COLA " + this.question.surveySubmitResponseAnswers.length)
    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  getValue(choice: any) {
    this.surveyService.setChoice(this.question.id , choice['answers'], this.question.questionType, this.email);
  }
}
