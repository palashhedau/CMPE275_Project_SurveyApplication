import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() email: string;
  @Output('showNotification') showNotification = new EventEmitter<{type: string, body: string}>();
  public selectedAnswer: string;

  constructor(private surveyService : SurveyService) {
  }

  ngOnInit() {
    if(this.question.surveySubmitResponseAnswers.length > 0){
      this.selectedAnswer = this.question.surveySubmitResponseAnswers[0]['answer'];
    }
  }

  selectAnswer(){
    this.surveyService.setChoice(this.question.id , this.answerChoice.value, this.question.questionType, this.email);
    this.showNotification.emit({type: 'Success' ,body : 'Option saved Successfully'});
  }



}
