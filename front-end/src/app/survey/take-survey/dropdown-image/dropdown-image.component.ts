import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-dropdown-image',
  templateUrl: './dropdown-image.component.html',
  styleUrls: ['./dropdown-image.component.css']
})
export class DropdownImageComponent implements OnInit {

  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('answerChoice') answerChoice: NgModel;
  public selectedAnswer: string;

  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  selectAnswer(){
    this.surveyService.setChoice(this.question.id , this.answerChoice.value, this.question.questionType);
  }

}
